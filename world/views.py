from django.core.serializers import serialize
from django.http.response import Http404
from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django_filters.rest_framework import DjangoFilterBackend
from django.views import generic
from django.contrib.gis.geos import GEOSGeometry
from django.contrib.gis.db.models.functions import Distance
from .serializers import WorldBorderSerializer
from rest_framework import viewsets, generics
from .filters import WorldPopulationFilter   
import requests

# Create your views here.

from .models import WorldBorder

longitude = -80.191788
latitude = 25.761681

user_location = GEOSGeometry('POINT(-96.876369 29.905320)', srid=4326) #GEOSGeometry(f'Point({longitude}, {latitude})', srid=4326)

def index(request):
    return HttpResponse("Hello World View")

class CountryListView(generic.ListView):
    model = WorldBorder
    context_object_name = 'countries'
    queryset = WorldBorder.objects.annotate(distance=Distance('mpoly',
    user_location)
    ).order_by('distance')[0:6]
    template_name = 'world/index.html'

def mapview(request):
    return render(request, 'world/map.html')

class WorldAPIView(generics.ListAPIView):
    serializer_class = WorldBorderSerializer
    queryset = WorldBorder.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['name', 'region', 'subregion', 'un']

class WorldAPIViewCustom(generics.ListAPIView):
    serializer_class = WorldBorderSerializer
    queryset = WorldBorder.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_class = WorldPopulationFilter


def AcpInfo(request):
    from requests.auth import HTTPBasicAuth
    import json

    def print_as_json(data):
        return json.dumps(data)

    ACTINIA_VERSION = 'v3'
    ACTINIA_BASEURL = 'http://actinia-core:8088'
    ACTINIA_URL = ACTINIA_BASEURL + "/api/" + ACTINIA_VERSION
    ACTINIA_AUTH = HTTPBasicAuth("actinia-gdi", "actinia-gdi")
    location_name = 'nc_spm_08'
    mapset_name = 'PERMANENT'
    raster_name = 'elevation'
    url = f"{ACTINIA_URL}/locations/{location_name}/mapsets/" \
          f"{mapset_name}/raster_layers/"
    test_res = {
        'actinia': "v3"
    }
    r = requests.get(url, auth=ACTINIA_AUTH)
    print(f"Request URL: {url}")
    print(r)
    return JsonResponse({"response": r.json()}, safe=False)


    return Response(print_as_json(r.json()), safe=False)

