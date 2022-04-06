###############################################################################
# Filename: views.py                                                           #
# Project: TomorrowNow                                                         #
# File Created: Monday March 14th 2022                                         #
# Author: Corey White (smortopahri@gmail.com)                                  #
# Maintainer: Corey White                                                      #
# -----                                                                        #
# Last Modified: Wed Apr 06 2022                                               #
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

import os
from django.core.serializers import serialize
from django.http.response import Http404
from django.shortcuts import render
from django.http import JsonResponse
from django.http import FileResponse, HttpResponse
from django_filters.rest_framework import DjangoFilterBackend
from django.views import generic
from django.contrib.gis.geos import GEOSGeometry
from django.contrib.gis.db.models.functions import Distance
from django.middleware.csrf import get_token
from .models import TestGCSResourceModel
from django.core.files.base import ContentFile

# from .serializers import WorldBorderSerializer
from rest_framework import viewsets, generics
import requests
import base64

from .utils import actinia as acp


def csrf(request):
    return JsonResponse({'csrfToken': get_token(request)})


def ping(request):
    return JsonResponse({'result': 'OK'})


def resourceStatus(user_id, resource_id):
    url = f"{acp.baseUrl()}/resources/{user_id}/{resource_id}"
    r = requests.get(url, auth=acp.auth())
    data = r.json()
    print(f"resourceStatus: {r.status_code}")
    if r.status_code == 200:
        if data['status'] == 'finished':
            print(f"Finished Resource: {data}")
            return data['urls']['resources']
        else:
            return resourceStatus(user_id, resource_id)


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
        decode = base64.b64encode(r.content).decode('utf-8')
        return JsonResponse({"response": {"imagedata": decode, "raster_name": raster_name}}, safe=False)


def rInfo(request, raster_name, mapset_name):
    """
    Get raster info using r.info
    Actinia Route
    GET /locations/{location_name}/mapsets/{mapset_name}/raster_layers/{raster_name}
    """

    mapset_name = 'PERMANENT'
    url = f"{acp.baseUrl()}/locations/{acp.location()}/mapsets/" \
          f"{mapset_name}/raster_layers/{raster_name}"

    r = requests.get(url, auth=acp.auth())
    print(f"Request URL: {url}")
    return JsonResponse({"response": r.json()}, safe=False)


# @csrf_exempt
def rGeoTiff(request, raster_name, mapset_name):
    """
    Get GeoTiff of an existing raster map layer
    Actinia Route
    POST /locations/{location_name}/mapsets/{mapset_name}/raster_layers/{raster_name}/geotiff_async
    """

    url = f"{acp.baseUrl()}/locations/{acp.location()}/mapsets/" \
        f"{mapset_name}/raster_layers/{raster_name}/geotiff_async_orig"

    r = requests.post(url, auth=acp.auth())

    if r.status_code == 200:
        jsonResponse = r.json()
        print(f"Response: {r.json()}")
        resource_id = jsonResponse['resource_id']

        viewResponse = {
            "response": {
                # "imagedata": newurl,
                "resourceId": resource_id,
                "status": jsonResponse["status"]
            }
        }

        # r2 = requests.get(newurl, auth=acp.auth())
        # print(f"Request Image Response: {r2}")
        # storage_object = TestGCSResourceModel(user_id=userId, resource_id=resource_id)
        # decode = base64.b64encode(r2.content).decode('utf-8')
        # storage_object.geotiff_result.save(f"{userId}_{resource_id}_{raster_name}",  ContentFile(decode))
        # print("Saved to Google Cloud Storage")
        # print(storage_object.geotiff_result.storage)
        return JsonResponse(viewResponse, safe=False)


# @csrf_exempt
def streamCOG(request, raster_name, resource_id):
    print("StreamCOG: ", request)

    resource_owner = acp.currentUser()
    print("Resource Owner: ", resource_owner)
    file_name = f'{raster_name}.tif'
    resource_location = os.path.join('actinia-core-data', 'resources', resource_owner, resource_id, file_name)
    print("Resource Location: ", resource_location)
    try:
        file = open(resource_location, 'rb')
        response = HttpResponse(content_type="image/tiff; application=geotiff; profile=cloud-optimized")
        response.headers['Content-Disposition'] = f'attachment; filename={file_name}'
        response.write(file.read())

    except IOError:
        response = JsonResponse({'error': 'File not exist'})

    return response
# /code/actinia-core-data/resources/actinia-gdi#