###############################################################################
# Filename: Counties.py                                                        #
# Project: TomorrowNow                                                         #
# File Created: Sunday October 16th 2022                                       #
# Author: Corey White (smortopahri@gmail.com)                                  #
# Maintainer: Corey White                                                      #
# -----                                                                        #
# Last Modified: Mon Oct 17 2022                                               #
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

from django.contrib.gis.db import models
import logging
# Get an instance of a logger
logger = logging.getLogger(__name__)


class County(models.Model):
    # cb_2018_us_county_500k
    name = models.CharField(max_length=100)
    statefp = models.CharField('statefp', max_length=2)
    countyfp = models.CharField('countyfp', max_length=3)
    countyns = models.CharField('countyns', max_length=8)
    affgeoid = models.CharField('affgeoid', max_length=14)
    geoid = models.CharField('geoid', max_length=5)
    lsad = models.CharField('lsad', max_length=2)
    aland = models.BigIntegerField()
    awater = models.BigIntegerField()

    # GeoDjango-specific: a geometry field (MultiPolygonField)
    geom = models.MultiPolygonField()

    # Returns the string representation of the model.
    def __str__(self):
        return self.name
