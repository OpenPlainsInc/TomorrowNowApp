/*
 * Filename: ProcessResponseModel.js
 * Project: TomorrowNow
 * File Created: Wednesday May 25th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Thu Jun 09 2022
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
import { SimpleResponseModel } from "./SimpleResponseModel";

/**
 * @Actinia
 * This is the base class for ALL response models.
 */
 export class ProcessResponseModel extends SimpleResponseModel {
    /**
     * Create ProcessResponseModel instance
     * @param {String} status The status of the response
     * @param {String} user_id The id of the user that issued a request
     * @param {String} resource_id The unique resource id
     * @param {Array.<ProcessLog>} [process_log = null] A list of ProcessLogs
     * @param {Array.<GrassModule>} [process_chain_list = null] The list of GRASS modules that were used in the processing
     * @param {String} [process_results = null] The process results
     * @param {ProgressInfoModel} [progress = null]
     * @param {string} [message = null] Message for the user, maybe status, finished or error message
     * @param {ExceptionTracebackModel|null} [exception = null]
     * @param {Number} accept_timestamp The acceptance timestamp in seconds of the response
     * @param {String} accept_datetime The acceptance timestamp of the response in human readable format
     * @param {Number} timestamp The current timestamp in seconds of the response
     * @param {Number} time_delta The time delta of the processing in seconds
     * @param {String} datetime The current timestamp of the response in human readable format
     * @param {Number|null} [http_code = null] The HTTP code of the response
     * @param {UrlModel|null} [urls = null]
     * @param {ApiInfoModel|null} [api_info = null]
     */ 
    constructor({status, user_id, resource_id, accept_timestamp, accept_datetime, timestamp, time_delta, datetime, process_log=null, process_chain_list=null, process_results=null, progress=null, message=null, exception=null, http_code = null, urls = null, api_info = null}) {
        super(status, message);
        this.acceptDatetime = new Date(accept_datetime);
        this.acceptTimestamp = accept_timestamp;
        this.apiInfo = api_info ? new ApiInfoModel({...api_info}) : api_info;
        this.datetime = new Date(datetime);
        this.exception = exception ? new ExceptionTracebackModel({...exception}) : exception;
        this.httpCode = http_code;
        this.processChainList = process_chain_list.map(this.__serializeProcessChain);
        this.processLogs = process_log.map(p => new ProcessLog({...p}));
        this.processResults = process_results;
        this.progress = progress ? new ProgressInfoModel({...progress}) : progress;
        this.resourceId = resource_id;
        this.timeDelta = time_delta;
        this.timestamp = timestamp;
        this.urls = urls ? new UrlModel({...urls}) : urls;
        this.userId = user_id; 
    }

    __serializeProcessChain(process) {
        let processList = {}
        for (const prop in process) {
            processList[prop] = new GrassModule({...process[prop]})
        }
        return processList
    }


    /**
     * Filters process logs by a defined GRASS executable
     * @param {String} executable - The name of the executable
     * @returns Actinia executable object
     */
    filterExecutables(executable) {
        return this.processLogs.filter(f => f.executable === executable)
    }

}

