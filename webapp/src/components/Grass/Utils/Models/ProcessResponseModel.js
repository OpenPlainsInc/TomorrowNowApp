/*
 * Filename: ProcessResponseModel.js
 * Project: TomorrowNow
 * File Created: Wednesday May 25th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Wed May 25 2022
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

import { ProcessLog } from "./ProcessLog";
import { GrassModule } from "./GrassModule";
import { ProgressInfoModel } from "./ProgressInfoModel";
import { ExceptionTracebackModel } from "./ExceptionTracebackModel";
import { UrlModel } from "./UrlModel";
import { ApiInfoModel } from "./ApiInfoModel";

/**
 * @param {String} status The status of the response
 * @param {String} user_id The id of the user that issued a request
 * @param {String} resource_id The unique resource id
 * @param {Array.<ProcessLog>} [process_log = null] A list of ProcessLogs
 * @param {Array.<GrassModule>} [process_chain_list = null] The list of GRASS modules that were used in the processing
 * @param {String} [process_results = null] The process results
 * @param {ProgressInfoModel} [progress = null]
 * @param {string} [message = null] Message for the user, maybe status, finished or error message
 * @param {ExceptionTracebackModel} [exception = null]
 * @param {Number} accept_timestamp The acceptance timestamp in seconds of the response
 * @param {String} accept_datetime The acceptance timestamp of the response in human readable format
 * @param {Number} timestamp The current timestamp in seconds of the response
 * @param {Number} time_delta The time delta of the processing in seconds
 * @param {String} datatime The current timestamp of the response in human readable format
 * @param {Number} [http_code = null] The HTTP code of the response
 * @param {UrlModel} [urls = null]
 * @param {ApiInfoModel} [api_info = null]
 */
 export class ProcessResponseModel {
    constructor(status, user_id, resource_id, accept_timestamp, accept_datetime, timestamp, time_delta, datatime, process_log=null, process_chain_list=null, process_results=null, progress=null, message=null, exception=null, http_code = null, urls = null, api_info = null) {
        this.status = status;
        this.user_id = user_id;
        this.resource_id = resource_id;
        this.accept_timestamp = accept_timestamp;
        this.accept_datetime = new Date(accept_datetime);
        this.timestamp = timestamp;
        this.time_delta = time_delta;
        this.datatime = new Date(datatime); 
        this.processLogs = process_log;
        this.process_chain_list = process_chain_list;
        this.process_results = process_results;
        this.progress = progress;
        this.message = message;
        this.exception = exception;
        this.http_code = http_code;
        this.urls = urls;
        this.api_info = api_info;
    }

    *getProcess_log() {
        for (const processLog of this.processLogs) {
            yield ProcessLog(...processLog)
        }
    }

    *getProcess_chain_list() {
        for (const processChainList of this.process_chain_list) {
            yield GrassModule(...processChainList)
        }
    }

    /**
     * @method
     * @description Filters process logs by a defined GRASS executable
     * @param {Array.<ProcessLog>} processLogs Array of process logs 
     * @param {String} executable 
     * @returns Actinia executable object
     */
    filterExecutables(executable) {
        return this.processLogs.filter(f => f.executable === executable)
    }

}

