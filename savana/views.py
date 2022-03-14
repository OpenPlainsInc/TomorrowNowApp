from django.core.serializers import serialize
from django.http.response import Http404
from django.shortcuts import render
from django.http import FileResponse
from django.http import JsonResponse
from django_filters.rest_framework import DjangoFilterBackend
from django.views import generic
from django.contrib.gis.geos import GEOSGeometry
from django.contrib.gis.db.models.functions import Distance
# from .serializers import WorldBorderSerializer
from rest_framework import viewsets, generics  
import requests
import base64

from .utils import actinia as acp

# Create your views here.
def gList(request):


    mapset_name = 'PERMANENT'
    url = f"{acp.baseUrl()}/locations/{acp.location()}/mapsets/" \
          f"{mapset_name}/raster_layers/"
    
    r = requests.get(url, auth=acp.auth())
    print(f"Request URL: {url}")
    print(r)
    return JsonResponse({"response": r.json()}, safe=False)

def rRenderImage(request, raster_name, mapset_name):
    """
    Get png image of raster
    Actinia Route
    GET /locations/{location_name}/mapsets/{mapset_name}/raster_layers/{raster_name}/render
    """
    
    url = f"{acp.baseUrl()}/locations/{acp.location()}/mapsets/" \
          f"{mapset_name}/raster_layers/{raster_name}/render"

    r = requests.get(url, auth=acp.auth(), stream=True)

    if r.status_code == 200:
        # with open(f'static/{raster_name}.png', "wb") as image_file:
        #     image_data = base64.b64encode(r.raw.read()).decode('utf-8')
        #     return FileResponse(open(, 'rb'))
    # ctx["image"] = image_data

        decode = base64.b64encode(r.content).decode('utf-8')
        return JsonResponse({"response": {"imagedata": decode, "raster_name": raster_name}}, safe=False)
