###############################################################################
# Filename: CreateModelRequest.py                                              #
# Project: TomorrowNow                                                         #
# File Created: Thursday October 20th 2022                                     #
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


from django.conf import settings
from django.db import models
from django.urls import reverse
from django.template.defaultfilters import slugify  # new
from .OPEnums import PrivacyEnum, StatusEnum
from .OPModelGoal import ModelGoal
from savana.utils import actinia as acp

# class GoalsEnum(models.TextChoices):
#     PROTECT = "PNR", "Protect Natural Reasources"
#     FRAGMENT = "LLF", "Limit Landscape Fragmentation"
#     ROAD_FLOODING = "RFOR", "Reduce Flooding Over Roads"
#     PROPERTY_DAMAGE_FLOODING = "RPDF", "Reduce Property Damage from Flooding"
#     WATER_QUALITY = "WQ", "Protect Water Quality"


class CreateModelRequest(models.Model):
    """
    A base model that will hold all other models.
    """

    modelName = models.CharField(max_length=250)  # The model name
    modelDescription = models.CharField(max_length=250)  # The model name
    goals = models.CharField(max_length=250)  # The model description
    counties = models.CharField(max_length=2, choices=(StatusEnum.choices), default=StatusEnum.INITIATING)
    # privacy = models.CharField(max_length=2, choices=(PrivacyEnum.choices), default=PrivacyEnum.PRIVATE)
    # mapset = models.CharField(max_length=250)  # TODO: Switch to Mapset Model
    # owner = models.ForeignKey('auth.User', on_delete=models.CASCADE, related_name='opmodel')
    # slug = models.SlugField(null=False, unique=True)  # new


    # {
#   "modelName": "The Triangle",
#   "senarios": 0,
#   "users": [],
#   "goals": {
#     "fragment": true,
#     "natural": true,
#     "floodRoad": false,
#     "floodDamage": false
#   },
#   "counties": [
#     "37063",
#     "37135",
#     "37183"
#   ],
#   "spatialTemporalScale": {
#     "spatial": {
#       "res": 30,
#       "extent": []
#     },
#     "temporal": {
#       "res": 365,
#       "extent": 10
#     }
#   },
#   "status": null,
#   "modelDescription": "triangel"
# }