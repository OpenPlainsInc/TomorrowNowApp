###############################################################################
# Filename: OPGoals.py                                                         #
# Project: TomorrowNow                                                         #
# File Created: Tuesday October 4th 2022                                       #
# Author: Corey White (smortopahri@gmail.com)                                  #
# Maintainer: Corey White                                                      #
# -----                                                                        #
# Last Modified: Tue Oct 04 2022                                               #
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
from django.urls import reverse
from django.template.defaultfilters import slugify
from .OPEnums import PrivacyEnum, StatusEnum

# Create your models here.

# class GoalsEnum(models.TextChoices):
#     PROTECT = "PNR", "Protect Natural Reasources"
#     FRAGMENT = "LLF", "Limit Landscape Fragmentation"
#     ROAD_FLOODING = "RFOR", "Reduce Flooding Over Roads"
#     PROPERTY_DAMAGE_FLOODING = "RPDF", "Reduce Property Damage from Flooding"
#     WATER_QUALITY = "WQ", "Protect Water Quality"


class Goal(models.Model):
    """
    Modeling Goals
    """

    name = models.CharField(max_length=250)  # The goal name
    description = models.CharField(max_length=250)  # The goal description
    label = models.CharField(max_length=250, unique=True)  # The goal label
    status = models.CharField(max_length=2, choices=(StatusEnum.choices), default=StatusEnum.INITIATING)
    privacy = models.CharField(max_length=2, choices=(PrivacyEnum.choices), default=PrivacyEnum.PRIVATE)
    slug = models.SlugField(null=False, unique=True)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("opmodel_detail", kwargs={"slug": self.slug})

    def save(self, *args, **kwargs):  # new
        if not self.slug:
            self.slug = slugify(self.name)
        return super().save(*args, **kwargs)
