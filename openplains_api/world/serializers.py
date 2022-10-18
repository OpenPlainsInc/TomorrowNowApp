# from rest_framework import serializers
from rest_framework_gis.serializers import GeoFeatureModelSerializer
from rest_framework import serializers
from .models import WorldBorder, County


class WorldBorderSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = WorldBorder
        ordering = ['name']
        geo_field = "mpoly"
        fields = ('id', 'un', 'region', 'subregion', 'name', 'area', 'pop2005', 'population_density', 'mpoly')


class CountyBoarderSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = County
        geo_field = "geom"
        fields = ('name', 'statefp', 'countyfp', 'geoid', 'geom')


class CountyGeoidSerializer(serializers.ModelSerializer):
    class Meta:
        model = County
        fields = ('name', 'statefp', 'countyfp', 'geoid')
