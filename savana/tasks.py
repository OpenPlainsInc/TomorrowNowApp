###############################################################################
# Filename: tasks.py                                                           #
# Project: TomorrowNow                                                         #
# File Created: Monday March 28th 2022                                         #
# Author: Corey White (smortopahri@gmail.com)                                  #
# Maintainer: Corey White                                                      #
# -----                                                                        #
# Last Modified: Wed Apr 13 2022                                               #
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


@shared_task()
def add(x, y):
    return x + y


@shared_task()
def asyncResourceStatus(user_id, resource_id):
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
        resource_group = f"savana_{resource_name}"

        print(f"""
        asyncResourceStatus Data ----
        Resource Group Name: {resource_group}
        Updated Status: {updated_status}
        Resource Url: {resources}
        """)

        response_message = {
            "type": 'resource_message',
            "message": updated_status,
            "resource_id": resource_id,
            "resources": resources
        }

        return async_to_sync(channel_layer.group_send)(resource_group, response_message)
