###############################################################################
# Filename: views.py                                                           #
# Project: TomorrowNow                                                         #
# File Created: Monday March 14th 2022                                         #
# Author: Corey White (smortopahri@gmail.com)                                  #
# Maintainer: Corey White                                                      #
# -----                                                                        #
# Last Modified: Thu May 05 2022                                               #
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

import imp
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
from .models import DrainRequest
from .serializers import DrainRequestSerializer
from django.core.files.base import ContentFile


# from .serializers import WorldBorderSerializer
from rest_framework import viewsets, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.parsers import JSONParser
from rest_framework import status

from django.views.decorators.csrf import csrf_exempt
from django.contrib.gis.geos import Point, Polygon


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


def gLocations(request):
    """
    Gets List of Users Avaliable Locations
    Actinia Route
    GET /locations
    """
    if request.method == 'GET':
        url = f"{acp.baseUrl()}/locations"
        r = requests.get(url, auth=acp.auth())
        print(f"Request URL: {url}")
        return JsonResponse({"response": r.json()}, safe=False)

    # TODO - Set up proper error handling and reponse messages
    return JsonResponse({"error": "gLocations View: Fix Me"})


def gLocation(request, location_name):
    """
    Create or Delete Location
    Actinia Route
    POST /locations/{locations_name}
    DELETE /locations/{locations_name}
    """
    url = f"{acp.baseUrl()}/locations/{location_name}"
    if request.method == 'POST':
        data = request.data
        r = requests.post(url, auth=acp.auth(), json=data)
        print(f"Request URL: {url}")
        return JsonResponse({"response": r.json()}, safe=False)

    if request.method == 'DELETE':
        r = requests.delete(url, auth=acp.auth())
        print(f"Request URL: {url}")
        if r.status_code == 200:
            return JsonResponse({"response": r.json()}, safe=False)
        else:
            return JsonResponse({"response": r.json()}, safe=False)

    # TODO - Set up proper error handling and reponse messages
    return JsonResponse({"error": "gLocation View: Fix Me"})


def gLocationInfo(request, location_name):
    """
    Get the location projection and current computational region of the PERMANENT mapset
    Actinia Route
    GET /locations/{location_name}/info
    """
    if request.method == 'GET':
        url = f"{acp.baseUrl()}/locations/{location_name}/info"
        r = requests.get(url, auth=acp.auth())
        print(f"Request URL: {url}")
        return JsonResponse({"response": r.json()}, safe=False)

    # TODO - Set up proper error handling and reponse messages
    return JsonResponse({"error": "gLocations View: Fix Me"})


def gMapsets(request, location_name):
    """
    Get a list of all mapsets that are located in a specific location.
    Actinia Route
    GET /locations/{location_name}/mapsets
    """
    url = f"{acp.baseUrl()}/locations/{location_name}/mapsets"
    if request.method == 'GET':
        r = requests.get(url, auth=acp.auth())
        print(f"Request URL: {url}")
        print(r)
        return JsonResponse({"response": r.json()}, safe=False)

    # TODO - Set up proper error handling and reponse messages
    return JsonResponse({"error": "gMapsets View: Fix Me"})


def gMapset(request, location_name, mapset_name):
    """
    Create or Delete Mapset
    Actinia Route
    POST /locations/{locations_name}/mapsets/{mapset_name}
    DELETE /locations/{locations_name}/mapsets/{mapset_name}
    """
    url = f"{acp.baseUrl()}/locations/{location_name}/mapset/{mapset_name}"
    if request.method == 'POST':
        r = requests.post(url, auth=acp.auth())
        print(f"Request URL: {url}")
        return JsonResponse({"response": r.json()}, safe=False)

    if request.method == 'DELETE':
        r = requests.delete(url, auth=acp.auth())
        print(f"Request URL: {url}")
        if r.status_code == 200:
            return JsonResponse({"response": r.json()}, safe=False)
        else:
            return JsonResponse({"response": r.json()}, safe=False)

    # TODO - Set up proper error handling and reponse messages
    return JsonResponse({"error": "gLocation View: Fix Me"})


def gMapsetInfo(request, location_name, mapset_name):
    """
    Get mapsets info.
    Actinia Route
    GET /locations/{location_name}/mapsets/{mapset_name}/info
    """
    url = f"{acp.baseUrl()}/locations/{location_name}/mapsets/{mapset_name}/info"
    if request.method == 'GET':
        r = requests.get(url, auth=acp.auth())
        print(f"Request URL: {url}")
        print(r)
        return JsonResponse({"response": r.json()}, safe=False)
    
    # TODO - Set up proper error handling and reponse messages
    return JsonResponse({"error": "gMapsets View: Fix Me"})


# Create your views here.
def gListRasters(request, location_name, mapset_name):
    """
    Get list of raster layers in mapset.
    Actinia Route
    GET /locations/{location_name}/mapsets/{mapset_name}/raster_layers
    """
    url = f"{acp.baseUrl()}/locations/{location_name}/mapsets/" \
          f"{mapset_name}/raster_layers"
    r = requests.get(url, auth=acp.auth())
    print(f"Request URL: {url}")
    print(r)
    return JsonResponse({"response": r.json()}, safe=False)


# Create your views here.
def gListVectors(request, location_name, mapset_name):
    """
    Get list of vector layers in mapset.
    Actinia Route
    GET /locations/{location_name}/mapsets/{mapset_name}/vector_layers
    """
    url = f"{acp.baseUrl()}/locations/{location_name}/mapsets/" \
          f"{mapset_name}/vector_layers"
    r = requests.get(url, auth=acp.auth())
    print(f"Request URL: {url}")
    print(r)
    return JsonResponse({"response": r.json()}, safe=False)


def rRenderImage(request, location_name, raster_name, mapset_name):
    """
    Get png image of raster
    Actinia Route
    GET /locations/{location_name}/mapsets/{mapset_name}/raster_layers/{raster_name}/render
    """

    url = f"{acp.baseUrl()}/locations/{location_name}/mapsets/" \
          f"{mapset_name}/raster_layers/{raster_name}/render"

    r = requests.get(url, auth=acp.auth(), stream=True)

    if r.status_code == 200:
        decode = base64.b64encode(r.content).decode('utf-8')
        return JsonResponse({"response": {"imagedata": decode, "raster_name": raster_name}}, safe=False)


def vRenderImage(request, location_name, vector_name, mapset_name):
    """
    Get png image of vector
    Actinia Route
    GET /locations/{location_name}/mapsets/{mapset_name}/vector_layers/{vector_name}/render
    """

    url = f"{acp.baseUrl()}/locations/{location_name}/mapsets/" \
          f"{mapset_name}/vector_layers/{vector_name}/render"

    r = requests.get(url, auth=acp.auth(), stream=True)

    if r.status_code == 200:
        decode = base64.b64encode(r.content).decode('utf-8')
        return JsonResponse({"response": {"imagedata": decode, "raster_name": vector_name}}, safe=False)


def rInfo(request, location_name, mapset_name, raster_name):
    """
    Get raster info using r.info
    Actinia Route
    GET /locations/{location_name}/mapsets/{mapset_name}/raster_layers/{raster_name}
    """

    url = f"{acp.baseUrl()}/locations/{location_name}/mapsets/" \
          f"{mapset_name}/raster_layers/{raster_name}"

    r = requests.get(url, auth=acp.auth())
    print(f"Request URL: {url}")
    return JsonResponse({"response": r.json()}, safe=False)


def vInfo(request, location_name, mapset_name, vector_name):
    """
    Get raster info using r.info
    Actinia Route
    GET /locations/{location_name}/mapsets/{mapset_name}/vector_layers/{vector_name}
    """

    url = f"{acp.baseUrl()}/locations/{location_name}/mapsets/" \
          f"{mapset_name}/vector_layers/{vector_name}"

    r = requests.get(url, auth=acp.auth())
    print(f"Request URL: {url}")
    return JsonResponse({"response": r.json()}, safe=False)


def rColors(request, location_name, mapset_name, raster_name):
    """
    Get a list of all mapsets that are located in a specific location.
    Actinia Route
    GET /locations/{location_name}/mapsets
    """
    url = f"{acp.baseUrl()}/locations/{location_name}/mapsets" \
          f"/{mapset_name}/raster_layers/{raster_name}/colors"
    if request.method == 'GET':
        r = requests.get(url, auth=acp.auth())
        print(f"Request URL: {url}")
        print(r)
        return JsonResponse({"response": r.json()}, safe=False)

    # TODO - Set up proper error handling and reponse messages
    return JsonResponse({"error": "gMapsets View: Fix Me"})


# @csrf_exempt
def rGeoTiff(request, location_name, mapset_name, raster_name):
    """
    Get GeoTiff of an existing raster map layer
    Export an existing raster map layer as GTiff or COG (if COG driver available). 
    The link to the exported raster map layer is located in the JSON response.
    Actinia Route
    POST /locations/{location_name}/mapsets/{mapset_name}/raster_layers/{raster_name}/geotiff_async
    """

    url = f"{acp.baseUrl()}/locations/{location_name}/mapsets/" \
        f"{mapset_name}/raster_layers/{raster_name}/geotiff_async_orig"

    r = requests.post(url, auth=acp.auth())

    if r.status_code == 200:
        jsonResponse = r.json()
        print(f"Response: {r.json()}")
        resource_id = jsonResponse['resource_id']

        viewResponse = {
            "response": {
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


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
@csrf_exempt
def rDrain(request):
    """
    r.drain
    """
    if request.method == 'GET':
        # TODO
        return JsonResponse({'route': 'GET: r.drain'})

    if request.method == 'POST':

        mapset_name = "basin_test"
        url = f"{acp.baseUrl()}/locations/{acp.location()}/mapsets/{mapset_name}/processing_async"
        print(f"Actinia Request Url: {url}")
        # body_unicode = request.body.decode('utf-8')
        print(request.data)
        coords = request.data[0]['point'].split(',')
        point = Point(float(coords[0]), float(coords[1]), srid=4326)
        db_point = point

        point.transform(ct=3358)
        # point.transform(ct=6542)
        print("Point", point)
        t_coords = [str(t) for t in point]
        t_coords = ",".join(t_coords)
        print("Transformed Point", t_coords)

        extent_coords = request.data[0]['extent']
      
        extent_ne = Point(float(extent_coords[0]), float(extent_coords[1]), srid=4326)
        extent_sw = Point(float(extent_coords[2]), float(extent_coords[3]), srid=4326)
        extent_ne.transform(ct=3358)
        extent_sw.transform(ct=3358)

        minx, miny = extent_ne
        maxx, maxy = extent_sw

        grass_commands = [
            {
                "module": "g.region",
                "id": "g.region_1804289",
                "inputs": [
                    {
                        "param": "align",
                        "value": "direction_3k_10m_d"
                    },
                    {
                        "param": "n",
                        "value": str(maxy)
                    },
                    {
                        "param": "e",
                        "value": str(maxx)
                    },
                    {
                        "param": "s",
                        "value": str(miny)
                    },
                    {
                        "param": "w",
                        "value": str(minx)
                    }
            

                ]
            },
            {
                "module": "r.circle",
                "id": "r.circle_1804289383",
                "flags": "b",
                "inputs": [
                    {
                        "param": "coordinates",
                        "value": t_coords
                    },
                    {
                        "param": "max",
                        "value": "200"
                    }
                ],
                "outputs": [
                    {
                        "param": "output",
                        "value": "circle"
                    }
                ]
            },
            {
                "module": "r.stream.basins",
                "id": "r.stream.basins_1804289382",
                "flags": "c",
                "inputs": [
                    {
                        "param": "direction",
                        "value": "direction_3k_10m_d"
                    },
                    {
                        "param": "stream_rast",
                        "value": "circle"
                    },
                    {
                        "param": "memory",
                        "value": "1500"
                    }
                ],
                "outputs": [
                    {
                        "param": "basins",
                        "value": "point_basin"
                    }
                ]
            },
            {
                "module": "r.to.vect",
                "id": "r.to.vect_1804289383",
                "inputs": [
                    {
                        "param": "input",
                        "value": "point_basin"
                    },
                    {
                        "param": "type",
                        "value": "area"
                    },
                    {
                        "param": "column",
                        "value": "value"
                    }
                ],
                "outputs": [
                    {
                        "param": "output",
                        "value": "point_basin_cloud"
                    }
                ]
            },
            {
                "module": "r.mask",
                "id": "r.mask",
                "inputs": [
                    {                
                        "param": "raster",
                        "value": "point_basin"
                    },
                    {
                        "param": "maskcats",
                        "value": "*"
                    },
                    {
                        "param": "layer",
                        "value": "1"
                    }
                ]
            },
            {
                "module": "r.stats",
                "id": "r.stats_2016",
                "flags": "acpl",
                "inputs": [
                    {
                        "param": "input",
                        "value": "nlcd_2016"
                    },
                    {
                        "param": "separator",
                        "value": "|"
                    },
                    {
                        "param": "null_value",
                        "value": "*"
                    },
                    {
                        "param": "nsteps",
                        "value": "255"
                    }
                ]
            },
            {
                "module": "r.in.gdal",
                "id": "r.in.gdal_1804289383",
                "flags": "ro",
                "inputs": [
                    {
                        "param": "input",
                        "value": "/vsicurl/https://storage.googleapis.com/tomorrownow-actinia-dev/nlcd/nlcd_2019_cog.tif"
                    },
                    {
                        "param": "memory",
                        "value": "3000"
                    },
                    {
                        "param": "offset",
                        "value": "0"
                    },
                    {
                        "param": "num_digits",
                        "value": "0"
                    }
                ],
                "outputs": [
                    {
                        "param": "output",
                        "value": "nlcd_2019_cog"
                    }
                ]
            },
            {
                "module": "r.stats",
                "id": "r.stats_2019",
                "flags": "acpl",
                "inputs": [
                    {
                        # "import_descr": {
                        #     "source": "https://storage.googleapis.com/tomorrownow-actinia-dev/nlcd/nlcd_2019_cog.tif",
                        #     "type": "raster"
                        # },
                        "param": "input",
                        "value": "nlcd_2019_cog"
                    },
                    # {
                    #     "import_descr": {
                    #         "source": "stac.3dep.rastercube.3dep-seamless",
                    #         "type": "stac",
                    #         "semantic_label": '',
                    #         "filter": {
                    #             # "summaries": {"gsd": {"eq": 30}}
                    #             "gsd": {"eq": "30"}
                    #         },
                    #         "extent": {
                    #             "spatial": {
                    #                 "bbox": [[str(minx), str(miny), str(maxx), str(maxy)]]
                    #             },
                    #             "temporal": {
                    #                 "interval": [["2021-09-09", "2021-09-12"]]
                    #             }
                    #         },
                    #         "resample": 'bilinear'
                    #     },
                    #     "param": "input",
                    #     "value": "3dep-seamless"
                    # },
                    {
                        "param": "separator",
                        "value": "|"
                    },
                    {
                        "param": "null_value",
                        "value": "*"
                    },
                    {
                        "param": "nsteps",
                        "value": "255"
                    }
                ]
            },
            {
                "id": "v.out.ogr_1804289383",
                "inputs": [
                    {
                        "param": "input",
                        "value": "point_basin_cloud"
                    },
                    {
                        "param": "layer",
                        "value": "1"
                    },
                    {
                        "param": "type",
                        "value": "area"
                    },
                    {
                        "param": "format",
                        "value": "PostgreSQL"
                    },
                    {
                        "param": "output_type",
                        "value": ""
                    },
                    {
                        "param": "dsco",
                        "value": ""
                    },
                    {
                        "param": "lco",
                        "value": ""
                    }
                ],
                "module": "v.out.ogr",
                "outputs": [
                    {
                        "param": "output",
                        "value": "PG:host=db port=5432 dbname=actinia user=actinia password=actinia"
                    }
                ]
            }
        ]
        pc = acp.create_actinia_process_chain(grass_commands)
        print(f"Process Chain: {pc}")
        r = requests.post(
            url, auth=acp.auth(),
            json=pc,
            headers={"content-type": "application/json; charset=utf-8"}
        )
        jsonResponse = r.json()
        print(f"Response: {r.json()}")
        requestModel = DrainRequestSerializer(data={"point": db_point})
        if (requestModel.is_valid()):
            print("serializer data:", requestModel.validated_data)
            requestModel.save()
            return JsonResponse({"savana_response": requestModel.data, "response": jsonResponse}, status=status.HTTP_201_CREATED)
        else:
            return JsonResponse({'route': 'r.drain', 'params': request.data, 'pc': pc, 'response': jsonResponse, 'errors': requestModel.errors})


def gModules(request):
    """
    Get a list of all grass modules that are avaliable to user.
    Actinia Route
    GET /grass_modules
    Parameters 
        tag
        category
        family (d,db,g,i,m,ps,r,r3,t,test,v)
        record : set to 'full' if you want full module response

    """

    url = f"{acp.baseUrl()}/grass_modules"
    if request.method == 'GET':
        query_params = request.GET
        r = requests.get(url, auth=acp.auth(), params=query_params)
        print(f"Request URL: {url}")
        print(r)
        return JsonResponse({"response": r.json()}, safe=False)

    # TODO - Set up proper error handling and reponse messages
    return JsonResponse({"error": "gModules View: Fix Me"})


def gModule(request, grassmodule):
    """
    Gets details about a Grass Module.
    Actinia Route
    GET /grass_modules/{grassmodule}
    """

    url = f"{acp.baseUrl()}/grass_modules/{grassmodule}"
    if request.method == 'GET':
        r = requests.get(url, auth=acp.auth())
        print(f"Request URL: {url}")
        print(r)
        if r.status_code == 200:
            return JsonResponse({"response": r.json()}, safe=False)

        if r.status_code == 400:
            return JsonResponse({"status": 400, "error": "gModules View: Fix Me"})

    # TODO - Set up proper error handling and reponse messages
    return JsonResponse({"error": "gModules View: Fix Me"})