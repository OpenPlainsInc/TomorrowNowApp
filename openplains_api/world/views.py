from django.core.serializers import serialize
from django.http.response import Http404
from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django_filters.rest_framework import DjangoFilterBackend
from django.views import generic
from django.contrib.gis.geos import GEOSGeometry
from django.contrib.gis.db.models.functions import Distance
from .serializers import WorldBorderSerializer, CountyBoarderSerializer
from rest_framework import viewsets, generics
from .filters import WorldPopulationFilter   
import requests

# Create your views here.

from .models import WorldBorder, County

longitude = -80.191788
latitude = 25.761681

user_location = GEOSGeometry('POINT(-96.876369 29.905320)', srid=4326)


def index(request):
    return HttpResponse("Hello World View")


def room(request, room_name):
    return render(request, 'world/room.html', {
        'room_name': room_name
    })


class CountryListView(generic.ListView):
    model = WorldBorder
    context_object_name = 'countries'
    queryset = (
        WorldBorder.objects.annotate(
            distance=Distance(
                'mpoly',
                user_location
            )
        )
    ).order_by('distance')[0:6]

    template_name = 'world/index.html'


def mapview(request):
    return render(request, 'world/map.html')


class WorldAPIView(generics.ListAPIView):
    serializer_class = WorldBorderSerializer
    queryset = WorldBorder.objects.all().order_by('name')
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['name', 'region', 'subregion', 'un']


class WorldAPIViewCustom(generics.ListAPIView):
    serializer_class = WorldBorderSerializer
    queryset = WorldBorder.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_class = WorldPopulationFilter


class CountyAPIView(generics.ListAPIView):
    serializer_class = CountyBoarderSerializer
    queryset = County.objects.all().order_by('geoid')
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['geoid', 'statefp', 'countyfp']
