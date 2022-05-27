/*
 * Filename: MapsetInfoResponseModel.js
 * Project: TomorrowNow
 * File Created: Thursday May 26th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Thu May 26 2022
 * Modified By: Corey White
 * -----
 * License: GPLv3
 * 
 * Copyright (c) 2022 TomorrowNow
 * 
 * TomorrowNow is an open-source geospatial participartory modeling platform
 * to enable stakeholder engagment in socio-environmental decision-makeing.
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 * 
 */

import { MapsetInfoModel } from "./MapsetInfoModel";
import { ProcessResponseModel } from "./ProcessResponseModel";

/**
 * Class representing a response schema that includes projection and region information
 * @extends ProcessResponseModel  
 */
export class MapsetInfoResponseModel extends ProcessResponseModel {
    /**
     * Create a MapsetInfoResponseModel
     * @param {Enum.<RequestStatus>} status - The status of the response
     * @param {String} user_id - The id of the user that issued a request
     * @param {String} resource_id - The unique resource id
     * @param {Array.<ProcessLog>} process_log - A list of ProcessLogModels
     * @param {Array.<GrassModule>} process_chain_list - A list of GrassModule
     * @param {Object.MapsetInfoModel} process_results - Schema for projection and region information from a specific mapset.
     * @param {ProgressInfoModel} [progress = null]
     * @param {string} [message = null] Message for the user, maybe status, finished or error message
     * @param {ExceptionTracebackModel|null} [exception = null]
     * @param {Number} accept_timestamp The acceptance timestamp in seconds of the response
     * @param {String} accept_datetime The acceptance timestamp of the response in human readable format
     * @param {Number} timestamp The current timestamp in seconds of the response
     * @param {Number} time_delta The time delta of the processing in seconds
     * @param {String} datatime The current timestamp of the response in human readable format
     * @param {Number|null} [http_code = null] The HTTP code of the response
     * @param {UrlModel|null} [urls = null]
     * @param {ApiInfoModel|null} [api_info = null]
     */
    constructor(status, user_id, resource_id, process_log, process_chain_list, process_results, progress, message, exception, accept_timestamp, accept_datetime, timestamp, time_delta, datetime, http_code, urls, api_info) {
        super(status, user_id, resource_id, process_log, process_chain_list, process_results, progress, message, exception, accept_timestamp, accept_datetime, timestamp, time_delta, datetime, http_code, urls, api_info)
        this.processResults = process_results ? new MapsetInfoModel(...process_results) : process_results
    }
}