/*
 * Filename: jsonparsers.js
 * Project: TomorrowNow
 * File Created: Tuesday May 24th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Tue May 24 2022
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


/**
 * @description The definition of a single GRASS GIS module and its inputs, outputs and flags. This module will be run in a location/mapset environment and is part of a process chain. The stdout and stderr output of modules that were run before this module in the process chain can be used as stdin for this module. The stdout of a module can be automatically transformed in list, table or key/value JSON representations in the HTTP response.
 * @param {String} id A unique id to identify …stdin in other modules.
 * @param {String} module The name of the GRASS GIS module (r.univar, r.slope.aspect, v.select, ...) that should be executed. Use as module names \"importer\" or \"exporter\" to import or export raster layer, vector layer or other file based data without calling a GRASS GIS module.
 * @param {Array.<InputParameter>} inputs A list of input parameters of a GRASS GIS module.
 * @param {Array.<OutputParameter>} outputs A list of output parameters of a GRASS GIS module.
 * @param {String} flags The flags that should be set for the GRASS GIS module.
 * @param {String} stdin Use the stdout output of a GRASS GIS module or executable of the process chain as input for this module. Refer to the module/executable output as *id::stderr* or *id::stdout*, the \"id\" is the unique identifier of a GRASS GIS module definition.
 * @param {StdoutParser} stdout
 * @param {Boolean} overwrite Set True to overwrite existing data.
 * @param {Boolean} verbose Set True to activate verbosity output of the module.
 * @param {Boolean} superquiet Set True to silence the output of the module.
 * @param {Boolean} interface_description Set True to print interface description and exit.
 */
class GrassModule {
    constructor(id, module, inputs, outputs, flags, stdin, stdout, overwrite, verbose, superquiet, interface_description) {
        this.id = id;
        this.module = module;
        this.inputs = inputs;
        this.outputs = outputs;
        this.flags = flags;
        this.stdin = stdin;
        this.stdout = stdout;
        this.overwrite = overwrite;
        this.verbose = verbose;
        this.superquiet = superquiet;
        this.interface_description = interface_description;
    }
} 


/**
 * @description Actinia class that defines the model for the Unix process information
 * @param {String} id The ID of the executable
 * @param {String} executable The name of the executable
 * @param {Array.<String>} parameter The parameter of the executable
 * @param {String} stdout The stdout output of the executable
 * @param {Array.<String>} stderr The stderr output of the executable as list of strings
 * @param {Number} return_code The return code of the executable
 * @param {Number} [run_time = NaN] The runtime of the executable in seconds
 * @param {Number} [mapset_size = NaN] The size of the mapset in bytes
 */
 class ProcessLog {
    constructor(id, executable, parameter, stdout, stderr, retun_code, run_time=NaN, mapset_size=undefined) {
        this.id = id; 
        this.executable = executable;
        this.parameter = parameter;
        this.stdout = stdout;
        this.stderr = stderr;
        this.retun_code = retun_code;
        this.run_time = run_time;
        this.mapset_size = mapset_size;
    }
}


/**
 * @param {String} status The status of the response
 * @param {String} user_id The id of the user that issued a request
 * @param {String} resource_id The unique resource id
 * @param {Array.<ProcessLog>} process_log A list of ProcessLogs
 * @param {Array.<GrassModule>} process_chain_list The list of GRASS modules that were used in the processing
 * @param {String} process_results The process results
 * @param {ProgressInfoModel} progress
 * @param {string} message Message for the user, maybe status, finished or error message
 * @param {ExceptionTracebackModel} exception
 * @param {Number} accept_timestamp The acceptance timestamp in seconds of the response
 * @param {String} accept_datetime The acceptance timestamp of the response in human readable format
 * @param {Number} timestamp The current timestamp in seconds of the response
 * @param {Number} time_delta The time delta of the processing in seconds
 * @param {String} datatime The current timestamp of the response in human readable format
 * @param {Number} http_code The HTTP code of the response
 * @param {UrlModel} urls 
 * @param {ApiInfoModel} api_info
 */
class ProcessResponseModel {
    constructor(status, user_id, resource_id, process_log, process_chain_list, process_results, progress, message, exception, accept_timestamp, accept_datetime, timestamp, time_delta, datatime, http_code, urls, api_info) {
        this.status = status;
        this.user_id = user_id;
        this.resource_id = resource_id;
        this.processLogs = process_log;
        this.process_chain_list = process_chain_list;
        this.process_results = process_results;
        this.progress = progress;
        this.message = message;
        this.exception = exception;
        this.accept_timestamp = accept_timestamp;
        this.accept_datetime = new Date(accept_datetime);
        this.timestamp = timestamp;
        this.time_delta = time_delta;
        this.datatime = new Date(datatime); 
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


/**
 * @description Filters process logs by a defined GRASS executable 
 * @param {Array.<ProcessLog>} processLogs Array of process logs 
 * @param {String} executable 
 * @returns Actinia executable object
 */
export const filterActiniaProcessLog = (processLogs, executable) => {
    return processLogs.filter(f => f.executable === executable)
}


/**
 * 
 * @param {*} executable 
 * @param {*} sep 
 * @returns Json object of univar statistics output
 */
export const univarJson = (executable, sep="|") => {
   return executable.map(e => {
    let rows = e.stdout.split('\n').map(a=> a.split(sep))
    const obj = rows[0].reduce((accumulator, element, index) => {
        return {...accumulator, [element]: rows[1][index]};
    }, {});
    return obj
   })
}