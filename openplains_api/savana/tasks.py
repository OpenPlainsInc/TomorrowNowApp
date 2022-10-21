###############################################################################
# Filename: tasks.py                                                           #
# Project: TomorrowNow                                                         #
# File Created: Monday March 28th 2022                                         #
# Author: Corey White (smortopahri@gmail.com)                                  #
# Maintainer: Corey White                                                      #
# -----                                                                        #
# Last Modified: Thu Oct 20 2022                                               #
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


from celery import shared_task
from .utils import actinia as acp
# from actinia import *
import requests
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync


# @shared_task()
# def ingest_futures_counties():


@shared_task()
def add(x, y):
    return x + y


@shared_task()
def asyncResourceStatus(user_id, resource_id, message_type="resource_message"):
    print(f"asyncResourceStatus: starting task {user_id}, {resource_id}")
    url = f"{acp.baseUrl()}/resources/{user_id}/{resource_id}"
    r = requests.get(url, auth=acp.auth())
    data = r.json()
    print(f"asyncResourceStatus: {r.status_code}")
    if r.status_code == 200:
        channel_layer = get_channel_layer()
        resource_name = resource_id.replace('-', '_')
        updated_status = data['status']
        resources = data['urls']['resources']
        process_log = []
        if data.get('process_log') is not None:
            process_log = data['process_log']

        resource_group = f"savana_{resource_name}"
        print(f"""
        asyncResourceStatus Data ----
        Resource Group Name: {resource_group}
        Updated Status: {updated_status}
        Resource Url: {resources}
        """)

        response_message = {
            "type": message_type,
            "message": updated_status,
            "resource_id": resource_id,
            "resources": resources,
            "process_log": process_log
        }

        return async_to_sync(channel_layer.group_send)(resource_group, response_message)


@shared_task()
def asyncModelUpdateResourceStatus(model_id, user_id, resource_id, message_type="resource_message"):
    print(f"asyncResourceStatus: starting task {user_id}, {resource_id}")
    url = f"{acp.baseUrl()}/resources/{user_id}/{resource_id}"
    r = requests.get(url, auth=acp.auth())
    data = r.json()
    print(f"asyncResourceStatus: {r.status_code}")
    if r.status_code == 200:
        channel_layer = get_channel_layer()
        resource_name = resource_id.replace('-', '_')
        updated_status = data['status']
        resources = data['urls']['resources']
        process_log = []
        if data.get('process_log') is not None:
            process_log = data['process_log']

        resource_group = f"savana_{resource_name}"

        response_message = {
            "model_id": model_id,
            "type": message_type,
            "message": updated_status,
            "resource_id": resource_id,
            "resources": resources,
            "process_log": process_log
        }

        return async_to_sync(channel_layer.group_send)(resource_group, response_message)


@shared_task()
def ingestData(modelId, mapset, geoids):
    print("Starting Ingest")
    url = f"{acp.baseUrl()}/locations/CONUS/mapsets/{mapset}/processing_async"
    # countyIds = [c.county.geoid for c in model.counties.all()]
    # geoids = f"geoid in ({','.join(countyIds)})"

    import_counties = {
        "module": "v.in.ogr",
        "flags": "",
        "id": f"v.in.ogr_{modelId}_{mapset}",
        "inputs": [
            {
                "param": "input",
                "value": "PG:host=db port=5432 dbname=actinia user=actinia password=actinia"
            },
            {
                "param": "layer",
                "value": "cb_2018_us_county_500k"
            },
            {
                "param": "where",
                "value": geoids
            },
            {
                "param": "location",
                "value": "cb_2018_us_county_500k"
            }
        ],
        "outputs": [
            {
                "param": "output",
                "value": "counties"
            }
        ]
    }

    reproject = {
        "module": "v.proj",
        "id": f"v.proj_{modelId}_{mapset}",
        "inputs": [
            {
                "param": "location",
                "value": "cb_2018_us_county_500k"
            },
            {
                "param": "mapset",
                "value": "PERMANENT"
            },
            {
                "param": "input",
                "value": "counties"
            },
            {
                "param": "smax",
                "value": "10000"
            }
        ]
    }

    grass_commands = [
        import_counties,
        reproject
    ]

    pc = acp.create_actinia_process_chain(grass_commands)

    r = requests.post(
        url,
        auth=acp.auth(),
        json=pc,
        headers={"content-type": "application/json; charset=utf-8"}
    )

    jsonResponse = r.json()
    asyncModelUpdateResourceStatus.delay(modelId, jsonResponse['user_id'], jsonResponse['resource_id'], message_type="model_setup")
