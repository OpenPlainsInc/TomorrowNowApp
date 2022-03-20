###############################################################################
# Filename: ProcessingResponseModel.py                                         #
# Project: TomorrowNow                                                         #
# File Created: Friday March 18th 2022                                         #
# Author: Corey White (smortopahri@gmail.com)                                  #
# Maintainer: Corey White                                                      #
# -----                                                                        #
# Last Modified: Fri Mar 18 2022                                               #
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
from django.core.files.storage import default_storage
# Create your models here.

def status_default():
    return {}

class ProcessingResponseModel(models.Model):
    """This is the base class for ALL response models.
    This class or its derivatives must be used in all responses that run
    GRASS modules or Unix programs. Derivatives only differ in the
    *process_result* schema.

    required = ['status', 'user_id', 'resource_id', 'timestamp', 'datetime',
                'accept_timestamp', 'accept_datetime', 'message']
    """
    
    status = models.CharField(max_length=50) # The status of the response (Probably and Enum)
    user_id = models.CharField(max_length=250) # The id of the user that issued a request
    resource_id = models.CharField(max_length=250) # The unique resource id
    # process_log = []  ProcessLogModel  # A list of ProcessLogModels
    # process_chain_list [] GrassModule # The list of GRASS modules that were used in the processing
    process_results = models.JSONField("process_results", default=dict) # An arbitrary class that stores the processing results
    # progress =  ProgressInfoModel
    message = models.CharField(max_length=50) # Message for the user, maybe status, finished or error message
    accept_timestamp= models.DecimalField(max_digits=19, decimal_places=6) # The acceptance timestamp of the response in human readable format
    # 'exception': ExceptionTracebackModel,
    accept_datetime = models.CharField(max_length=250) # The acceptance timestamp of the response in human readable format
    timestamp = models.DecimalField(max_digits=19, decimal_places=6) # The current timestamp in seconds of the response
    time_delta = models.DecimalField(max_digits=19, decimal_places=6) # The delta of the processing in seconds
    datetime = models.CharField(max_length=250) # The current timestamp of the response in human readable format
    # urls = UrlModel,
    # api_info = ApiInfoModel