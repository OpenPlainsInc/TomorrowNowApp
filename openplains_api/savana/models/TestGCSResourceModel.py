###############################################################################
# Filename: TestGCSResourceModel.py                                            #
# Project: TomorrowNow                                                         #
# File Created: Monday March 14th 2022                                         #
# Author: Corey White (smortopahri@gmail.com)                                  #
# Maintainer: Corey White                                                      #
# -----                                                                        #
# Last Modified: Tue Sep 27 2022                                               #
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


from multiprocessing.pool import TERMINATE
from django.db import models
from django.core.files.storage import default_storage
import datetime
from django.contrib import admin
from django.utils import timezone


COG_CONTENT_TYPE = "image/tiff; application=geotiff; profile=cloud-optimized"
# default_storage.


class ActiniaResourceStatus(models.TextChoices):
    ACPECTED = "AC", "accepted"
    RUNNING = "RN", "running"
    FINISHED = "FN", "finished"
    TERMINATED = "TM", "terminated"
    ERROR = "ER", "error"


class TestGCSResourceModel(models.Model):
    user_id = models.CharField(max_length=250)
    resource_id = models.CharField(max_length=250, primary_key=True)
    geotiff_result = models.ImageField(upload_to="geotiff_results")
    status = models.CharField(
        max_length=2,
        choices=ActiniaResourceStatus.choices,
        default=ActiniaResourceStatus.ACPECTED
    )


# class Question(models.Model):
#     """
#     """
#     question_text = models.CharField(max_length=200)
#     pub_date = models.DateTimeField('date published')

#     def __str__(self):
#         return self.question_text

#     @admin.display(
#         boolean=True,
#         ordering='pub_date',
#         description='Published recently?',
#     )
#     def was_published_recently(self):
#         now = timezone.now()
#         return now - datetime.timedelta(days=1) <= self.pub_date <= now


# class Choice(models.Model):
#     """
#     """
#     question = models.ForeignKey(Question, on_delete=models.CASCADE)
#     choice_text = models.CharField(max_length=200)
#     votes = models.IntegerField(default=0)

#     def __str__(self):
#         return self.choice_text
