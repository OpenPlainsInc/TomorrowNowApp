###############################################################################
# Filename: consumers.py                                                       #
# Project: TomorrowNow                                                         #
# File Created: Sunday March 27th 2022                                         #
# Author: Corey White (smortopahri@gmail.com)                                  #
# Maintainer: Corey White                                                      #
# -----                                                                        #
# Last Modified: Fri Oct 21 2022                                               #
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
from email.policy import default
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from .models.OPEnums import StatusEnum
from .models.OPModel import OpenPlainsModel
from . import tasks
from .utils import actinia as acp
from django.contrib.gis.gdal import GDALRaster
import os


class ActiniaResourceConsumer(AsyncWebsocketConsumer):
    """
    Listens for actinia resources status changes and send results to client
    """

    async def connect(self):
        print("ActiniaResourceConsumer: Connect")
        print("ActiniaResourceConsumer: Channel Name: ", self.channel_name)

        self.resource_name = self.scope['url_route']['kwargs']['resource_name']
        print("ActiniaResourceConsumer: Resource Name: ", self.resource_name)

        self.resource_group_name = 'savana_%s' % self.resource_name
        print("ActiniaResourceConsumer: Resource Group Name: ", self.resource_group_name)

        # Join room group
        await self.channel_layer.group_add(
            self.resource_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        print("ActiniaResourceConsumer: Disconnect")
        print("ActiniaResourceConsumer: Disconnect Close Code:", close_code)

        # Leave room group
        await self.channel_layer.group_discard(
            self.resource_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        print("ActiniaResourceConsumer: Recieve", text_data)

        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        resource_id = text_data_json['resource_id']
        model_id = text_data_json['model_id'] if text_data_json.has_key('model_id') else None
        message_type = text_data_json['message_type']
        print("ActiniaResourceConsumer: Recieve Message", message)

        # Send message to room group
        await self.channel_layer.group_send(
            self.resource_group_name,
            {
                'type': message_type,
                'message': message,
                'resource_id': resource_id,
                'model_id': model_id
            }
        )

    # Receive message from room group
    async def resource_message(self, event):
        print("ActiniaResourceConsumer: Resource message", self.channel_layer)
        print("ActiniaResourceConsumer: Resource message event", event)

        message = event['message']
        resource_id = event['resource_id']
        user_id = acp.currentUser()  # scope["user"]

        # accepted, running, finished, terminated, error'

        if message in ['accepted']:
            tasks.asyncResourceStatus.delay(user_id, resource_id)
        elif message in ['running']:
            await self.send(text_data=json.dumps({
                'message': message,
                'resource_id': resource_id
            }))
            tasks.asyncResourceStatus.delay(user_id, resource_id, "resource_message")
            
        elif message == 'finished':
            resources = event['resources']
            resource_owner = acp.currentUser()
            print("Resource Owner: ", resource_owner)
            if (len(resources) > 0):
                file_name = resources[0].split('/')[-1]
                resource_location = os.path.join('actinia-core-data', 'resources', resource_owner, resource_id, file_name)
                rst = GDALRaster(resource_location, write=False)
                print("GDAL RASTER Statistics: ", rst.bands[0].statistics())
                raster_stats = rst.bands[0].statistics()
                # print("GDAL RASTER Color: ", rst.bands[0].color_interp())
                await self.send(text_data=json.dumps({
                    'type': "resource_message",
                    'message': message,
                    'resource_id': resource_id,
                    'resources': resources,
                    'statistics': {
                        'min': raster_stats[0],
                        'max': raster_stats[1],
                        'mean': raster_stats[2],
                        'median': raster_stats[3]
                    }
                }))
            else:
                await self.send(text_data=json.dumps({
                    'type': "resource_message",
                    'message': message,
                    'resource_id': resource_id,
                    'resources': resources,
                    'process_log': event['process_log']
                }))

        else:
            # Send message to WebSocket
            await self.send(text_data=json.dumps({
                'type': "resource_message",
                'message': message,
                'resource_id': resource_id
            }))

    # Check if model ingest is complete and update the database.
    async def model_setup(self, event):
        print("ActiniaResourceConsumer: model_setup", self.channel_layer)
        print("ActiniaResourceConsumer: Resource message event", event)

        message = event['message']
        resource_id = event['resource_id']
        model_id = event['model_id']
        user_id = acp.currentUser()  # scope["user"]
        resources = event['resources']
        print("Task Message: ", message)
        # accepted, running, finished, terminated, error'
        if message in ['accepted', 'running']:
            tasks.asyncModelUpdateResourceStatus.delay(model_id, user_id, resource_id, "model_setup")

        elif message == 'finished':
            print("Model Finished Import")
            # TODO - figure out why this isn't updatating the model.
            model = OpenPlainsModel.objects.get(pk=model_id)
            model.status = StatusEnum.READY
            model.save()
            print("Model Status Updated to Ready")

            await self.send(text_data=json.dumps({
                'type': "model_setup",
                'message': message,
                'resource_id': resource_id,
                'resources': resources
            }))
        else:
            await self.send(text_data=json.dumps({
                'type': "model_setup",
                'message': message,
                'resource_id': resource_id,
                'resources': resources,
                'process_log': event['process_log']
            }))
