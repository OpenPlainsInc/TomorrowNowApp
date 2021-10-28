# from rest_framework import serializers
from rest_framework_gis.serializers import GeoFeatureModelSerializer

from .models import WorldBorder

class WorldBorderSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = WorldBorder
        geo_field = "mpoly"
        fields = ('id' ,'un','region','subregion','name', 'area', 'pop2005','population_density','mpoly')