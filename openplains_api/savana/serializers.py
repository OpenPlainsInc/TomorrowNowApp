###############################################################################
# Filename: serializers.py                                                     #
# Project: TomorrowNow                                                         #
# File Created: Friday March 18th 2022                                         #
# Author: Corey White (smortopahri@gmail.com)                                  #
# Maintainer: Corey White                                                      #
# -----                                                                        #
# Last Modified: Mon Nov 07 2022                                               #
# Modified By: Corey White                                                     #
# -----                                                                        #
# License: GPLv3                                                               #
#                                                                              #
# Copyright (c) 2022 TomorrowNow                                               #
#                                                                              #
# TomorrowNow is an open-source geospatial participartory modeling platform    #
# to enable stakeholder engagment in socio-environmental decision-makeing.     #
#                                                                              #
# This program is free software: you can redistribute it and/or modify         #
# it under the terms of the GNU General Public License as published by         #
# the Free Software Foundation, either version 3 of the License, or            #
# (at your option) any later version.                                          #
#                                                                              #
# This program is distributed in the hope that it will be useful,              #
# but WITHOUT ANY WARRANTY; without even the implied warranty of               #
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the                #
# GNU General Public License for more details.                                 #
#                                                                              #
# You should have received a copy of the GNU General Public License            #
# along with this program.  If not, see <https://www.gnu.org/licenses/>.       #
#                                                                              #
###############################################################################

from rest_framework import serializers
from django.contrib.gis.geos import Point, GeometryCollection
from rest_framework_gis.serializers import GeoFeatureModelSerializer, GeometrySerializerMethodField
from django.contrib.auth.models import User
from rest_framework.authtoken.serializers import AuthTokenSerializer
from .models import DrainRequest, OpenPlainsModel, ModelGoal, Goal, ModelExtent, OPEnums
from .models.OPEnums import StatusEnum
from world.serializers import CountyGeoidSerializer
from world.models import County
from .tasks import ingestData


class ModelExtentSerializer(serializers.ModelSerializer):
    county = CountyGeoidSerializer()

    class Meta:
        model = ModelExtent
        fields = ['county']


class GoalSerializer(serializers.ModelSerializer):
    privacy = serializers.CharField(source='get_privacy_display')
    status = serializers.CharField(source='get_status_display')

    class Meta:
        model = Goal
        fields = '__all__'


class ModelGoalSerializer(serializers.ModelSerializer):
    privacy = serializers.CharField(source='get_privacy_display')
    status = serializers.CharField(source='get_status_display')
    goal = GoalSerializer()

    class Meta:
        model = ModelGoal
        fields = ['privacy', 'status', 'name', 'goal']


class DrainRequestSerializer(GeoFeatureModelSerializer):
    """ A class to serialize locations as GeoJSON compatible data """

    # owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = DrainRequest
        geo_field = 'point'
        fields = ('point', 'huc12')


class OPModelSerializer(GeoFeatureModelSerializer):

    owner = serializers.ReadOnlyField(source='owner.username')
    status = serializers.CharField(source='get_status_display')
    goals = ModelGoalSerializer(many=True, read_only=True)  # serializers.PrimaryKeyRelatedField(many=True, queryset=ModelGoal.objects.all())
    privacy = serializers.CharField(source='get_privacy_display')  # (ChoiceField(choices=PrivacyEnum)
    counties = ModelExtentSerializer(many=True, read_only=True)
    centroid = GeometrySerializerMethodField()

    def get_centroid(self, obj):
        centroid = obj.model_region_centroid()['point']
        return centroid

    class Meta:
        model = OpenPlainsModel
        geo_field = 'centroid'
        id_field = False
        fields = ['id', 'name', 'description', 'privacy', 'mapset', 'owner', 'slug', 'status', 'goals', 'counties']


class UserSerializer(serializers.ModelSerializer):
    opmodels = serializers.PrimaryKeyRelatedField(many=True, queryset=OpenPlainsModel.objects.all())

    class Meta:
        model = User
        fields = ['id', 'username', 'opmodels']


class StringListField(serializers.ListField):
    child = serializers.CharField()


class CreateModelSerializer(serializers.Serializer):
    modelName = status = serializers.CharField(max_length=100)
    modelDescription = serializers.CharField(max_length=250)  # The model name
    status = serializers.ChoiceField(choices=(StatusEnum.choices), default=StatusEnum.INITIATING)
    goals = serializers.JSONField()
    counties = StringListField(min_length=1, max_length=5, allow_empty=False)

    def create(self, validated_data):
        print("creating new model")
        print("Validated Data: ", validated_data)
        print("Context: ", self.context)
        print("Context Request: ", self.context['request'].user)
        owner = self.context['request'].user
        opModel = OpenPlainsModel.objects.create(
            name=validated_data['modelName'],
            description=validated_data['modelDescription'],
            status=validated_data['status'],
            owner=owner
        )

        # Set the model extent based on the county.
        for county in County.objects.filter(geoid__in=validated_data['counties']):
            ModelExtent.objects.create(
                model=opModel,
                county=county
            )

        # Set goals for the model
        for k, v in validated_data['goals'].items():
            if v:
                goal = Goal.objects.get(slug=k)
                print("The goal is ", goal.label)
                ModelGoal.objects.create(
                    goal=goal,
                    model=opModel
                )

        # Ingest County Data Into Mapset
        # This is a celery task
        ingestData.delay(opModel.id, opModel.location, opModel.geoids())
        return opModel


# { cat: 11, color: "#476ba1", label: "Open Water", … }
# ​​
# "Open Water": "0.02"
# ​​
# area: "0.02"
# ​​
# cat: 11
# ​​
# catDetails: Object { family: 1, family_label: "Water", family_color: "#476ba1", … }
# ​​​
# category: 11
# ​​​
# category_color: "#476ba1"
# ​​​
# category_label: "Open Water"
# ​​​
# description: "Areas of open water, generally with less than 25% cover of vegetation or soil"
# ​​​
# family: 1
# ​​​
# family_color: "#476ba1"
# ​​​
# family_label: "Water"
# ​​​
# <prototype>: Object { … }
# ​​
# cells: 18
# ​​
# color: "#476ba1"
# ​​
# label: "Open Water"
# ​​
# percent: "0.03%"
# ​​
# year: "2001"
# }​
