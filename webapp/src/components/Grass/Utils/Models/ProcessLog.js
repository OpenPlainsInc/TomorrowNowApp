/*
 * Filename: ProcessLog.js
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
 export class ProcessLog {
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
