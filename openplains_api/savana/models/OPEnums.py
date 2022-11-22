###############################################################################
# Filename: Enums.py                                                           #
# Project: TomorrowNow                                                         #
# File Created: Tuesday October 4th 2022                                       #
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
from django.db import models
from django.utils.translation import gettext_lazy as _


class StatusEnum(models.TextChoices):
    ACCPECTED = "AC", _("Active")
    READY = "RD", _("Ready")
    RUNNING = "RT", _("Retired")
    INITIATING = "IN", _("Initiating")
    ERROR = "ER", _("Error")


class PrivacyEnum(models.TextChoices):
    PUBLIC = "PU", _("Public")
    PRIVATE = "PR", _("Private")


class InteractionTypeEnum(models.TextChoices):
    """UI Choices for Interaction"""
    LIKERT = "LI", _("Likert")  # Likert Scale UI
    SLIDER = "RE", _("Slider")  # Slider UI
    RANGESLIDER = "RS", _("Range Slider")  # Range Slider UI
    SELECT = "SL", _("Select")  # Select UI
    SELECTMULTI = "SM", _("Select Multiple")  # Mulit Select UI
    DATEFILTER = "DF", _("Date Filter")  # Date Filter UI


class InteractionScaleEnum(models.TextChoices):
    """Choices for what scale an interaction will occur"""
    GLOBAL = "GL", _("Global")  # Zoom levels 0 -
    REGIONAL = "RE", _("Regional")  # Zoom levels 0 -
    CITY = "CI", _("City")  # Zoom levels 0 -
    NEIGHBORHOOD = "NE", _("Neighborhood")  # Zoom levels 0 -
    LOCAL = "LO", _("Local")  # Zoom levels 0 -
    CUSTOM = "CO", _("Custom")  # Custom Scale


class SpatialInteractionEnum(models.TextChoices):
    """Choice for spatail interactions"""
    POINT = "PO", _("Point")  # User sets a point
    LINE = "LI", _("Line")  # User draws a line
    MULTIPOLYGON = "MP", _("Multipolygon")  # User draws a polygon
    FEATURE = "FT", _("Feature")  # User selects a feature
