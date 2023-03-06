###############################################################################
# Filename: OPInteraction.py                                                   #
# Project: TomorrowNow                                                         #
# File Created: Thursday November 17th 2022                                    #
# Author: Corey White (smortopahri@gmail.com)                                  #
# Maintainer: Corey White                                                      #
# -----                                                                        #
# Last Modified: Tue Nov 22 2022                                               #
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

# from django.conf import settings
# from django.db import models
# from django.urls import reverse
# from django.template.defaultfilters import slugify
# from django.contrib.gis.db.models.aggregates import Union
# from django.contrib.gis.db.models.functions import Centroid, AsGeoJSON
# from world.models.County import County  # new
# from .OPEnums import PrivacyEnum, StatusEnum, InteractionTypeEnum, SpatialInteractionEnum, InteractionScaleEnum
# from .OPModelGoal import ModelGoal
# from .OpenModelExtent import ModelExtent
# from savana.utils import actinia as acp


# class OPInteraction(models.Model):
#     """
#     A base model that stores model interactions.
#     """

#     name = models.CharField(max_length=250)  # The model name
#     description = models.CharField(max_length=250)  # The model description
#     status = models.CharField(max_length=2, choices=(StatusEnum.choices), default=StatusEnum.INITIATING)
#     privacy = models.CharField(max_length=2, choices=(PrivacyEnum.choices), default=PrivacyEnum.PRIVATE)
#     owner = models.ForeignKey('auth.User', on_delete=models.CASCADE, related_name='opmodel')
#     slug = models.SlugField(null=False, unique=True)  # new
#     interaction_type = models.CharField(max_length=2, choices=(InteractionTypeEnum.choices), default=None)
#     spatial_interaction = models.CharField(max_length=2, choices=(SpatialInteractionEnum.choices), default=None)
#     interaction_scale = models.CharField(max_length=2, choices=(InteractionScaleEnum.choices), default=None)
#     process_id = models.CharField(max_length=250, default=None)

#     def __str__(self):
#         return self.name
