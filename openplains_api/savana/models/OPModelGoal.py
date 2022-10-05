###############################################################################
# Filename: OGModelGoal.py                                                     #
# Project: TomorrowNow                                                         #
# File Created: Tuesday October 4th 2022                                       #
# Author: Corey White (smortopahri@gmail.com)                                  #
# Maintainer: Corey White                                                      #
# -----                                                                        #
# Last Modified: Wed Oct 05 2022                                               #
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

from django.db import models

from .OPEnums import PrivacyEnum, StatusEnum
from .OPGoal import Goal


class ModelGoal(models.Model):
    """
    The goals of a specific OPModel
    """

    name = models.CharField(max_length=250)  # The model name
    status = models.CharField(max_length=2, choices=(StatusEnum.choices), default=StatusEnum.INITIATING)
    privacy = models.CharField(max_length=2, choices=(PrivacyEnum.choices), default=PrivacyEnum.PRIVATE)
    goal = models.ForeignKey(Goal, editable=True, on_delete=models.CASCADE, null=True)
    model = models.ForeignKey("savana.OpenPlainsModel", editable=True, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.name
