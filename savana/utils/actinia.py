###############################################################################
# Filename: actinia.py                                                         #
# Project: TomorrowNow                                                         #
# File Created: Monday March 14th 2022                                         #
# Author: Corey White (smortopahri@gmail.com)                                  #
# Maintainer: Corey White                                                      #
# -----                                                                        #
# Last Modified: Tue Mar 29 2022                                               #
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


from django.conf import settings
from requests.auth import HTTPBasicAuth
import json
import os
from django.contrib.gis.gdal import DataSource
import time
import requests
from channels.layers import get_channel_layer

ACTINIA_SETTINGS = settings.ACTINIA


def print_as_json(data):
    return json.dumps(data)


def auth():
    # print(ACTINIA_SETTINGS)
    auth = HTTPBasicAuth(ACTINIA_SETTINGS['ACTINIA_USER'], ACTINIA_SETTINGS['ACTINIA_PASSWORD'])
    return auth


def baseUrl():
    ACTINIA_URL = os.path.join('http://', ACTINIA_SETTINGS['ACTINIA_BASEURL'], 'api', ACTINIA_SETTINGS['ACTINIA_VERSION'])
    # print(ACTINIA_URL)
    return ACTINIA_URL


def location():
    return ACTINIA_SETTINGS['ACTINIA_LOCATION']


def currentUser():
    return ACTINIA_SETTINGS['ACTINIA_USER']


# Bad
# def waitForResource(jsonResponse, url=None):
#     print(f"waitForResource: Resource {jsonResponse['resource_id']} is {jsonResponse['status']}")    # print formatted JSON

#     url = url if url else f"{baseUrl()}/resources/{jsonResponse['user_id']}/{jsonResponse['resource_id']}"
#     if jsonResponse["status"] in ("accepted", "running"):
#         # poll the resource until status has changed
#         request_url = jsonResponse["urls"]["status"]
#         request = requests.get(url=request_url, auth=auth())
#         jsonResponse = request.json()

#         while jsonResponse["status"] in ("accepted", "running"):
#             time.sleep(1)
#             jsonResponse = request.json()


#         print(f"Resource {jsonResponse['resource_id']} is {jsonResponse['status']}")    # print formatted JSON
#         print_as_json(jsonResponse)

def resourceStatus(user_id, resource_id):
    url = f"{baseUrl()}/resources/{user_id}/{resource_id}"
    r = requests.get(url, auth=auth())
    data = r.json()
    print(f"resourceStatus: {r.status_code}")
    if r.status_code == 200:
        if data['status'] == 'finished':
            print(f"Finished Resource: {data}")
            return data['urls']['resources']
        else:
            return resourceStatus(user_id, resource_id)

from asgiref.sync import async_to_sync


def asyncResourceStatus(user_id, resource_id):
    url = f"{baseUrl()}/resources/{user_id}/{resource_id}"
    r = requests.get(url, auth=auth())
    data = r.json()
    print(f"asyncResourceStatus: {r.status_code}")
    if r.status_code == 200:
        channel_layer = get_channel_layer()
        resource_name = resource_id.replace('-', '_')
        updated_status = data['status']
        print(f"asyncResourceStatus 200: {updated_status}: {resource_name}")

        async_to_sync(channel_layer.group_send)(f"savana_{resource_name}", {"type": 'resource_message', "message": updated_status})

        # await channel_layer.group_send(
        #     f"savana_{resource_name}",
        #     {"type": 'resource_message', "message": updated_status}
        # )

        if data['status'] == 'finished':
            print(f"Finished Resource: {data}")
            return  # data['urls']['resources']
        else:
            return asyncResourceStatus(user_id, resource_id)
