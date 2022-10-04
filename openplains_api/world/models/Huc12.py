###############################################################################
# Filename: huc12.py                                                           #
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

from django.contrib.gis.db import models
from .utils import HucTypeEnum

import logging
# Get an instance of a logger
logger = logging.getLogger(__name__)


class Huc12(models.Model):
    objectId = models.BigIntegerField(unique=True)
    tnmid = models.CharField(max_length=40)
    metasourceid = models.CharField(max_length=40)
    sourcedatadesc = models.CharField(max_length=100)
    sourceoriginator = models.CharField(max_length=130)
    sourcefeatureid = models.CharField(max_length=40)
    loaddate = models.DateField()
    noncontributingareaacres = models.FloatField()
    noncontributingareasqkm = models.FloatField()
    areasqkm = models.FloatField()
    areaacres = models.FloatField()
    referencegnis_ids = models.CharField(max_length=50)
    name = models.CharField(max_length=120)
    states = models.CharField(max_length=50)
    huc12 = models.CharField(max_length=12)
    hutype = models.CharField(max_length=1, choices=HucTypeEnum.choices)
    humod = models.CharField(max_length=30)
    tohuc = models.CharField(max_length=16)
    geom = models.MultiPolygonField()

    # Returns the string representation of the model.
    def __str__(self):
        return self.name
