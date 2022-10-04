###############################################################################
# Filename: huc_type_enum.py                                                   #
# Project: TomorrowNow                                                         #
# File Created: Tuesday May 10th 2022                                          #
# Author: Corey White (smortopahri@gmail.com)                                  #
# Maintainer: Corey White                                                      #
# -----                                                                        #
# Last Modified: Tue May 10 2022                                               #
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

# from enum import Enum
from django.utils.translation import gettext_lazy as _
from django.contrib.gis.db import models


class HucTypeEnum(models.TextChoices):
    Standard = 'S', _('Standard')
    Closed_Basin = 'B', _('Closed Basin')
    Frontal = 'F', _('Frontal')
    Multiple_Outlet = 'M', _('Multiple Outlet')
    Water = 'W', _('Water')
    Island = 'I', _('Island')
    Urban = 'U', _('Urban')
    Indeterminate = 'D', _('Indeterminate')
