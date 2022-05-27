/*
 * Filename: ProcessLog.js
 * Project: TomorrowNow
 * File Created: Wednesday May 25th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Fri May 27 2022
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
 * @Actinia
 * @version 4.0.1
 * Class that defines the model for the Unix process information
 */
 export class ProcessLog {
    /**
     * Create ProcessLog instance
     * @param {Object}
     * @param {String} id The ID of the executable
     * @param {String} executable The name of the executable
     * @param {Array.<String>} [parameter = []] The parameter of the executable
     * @param {String} [stdout = null] The stdout output of the executable
     * @param {Array.<String>} [stderr = []] The stderr output of the executable as list of strings
     * @param {Number} [return_code = null] The return code of the executable
     * @param {Number} [run_time = null] The runtime of the executable in seconds
     * @param {Number} [mapset_size = null] The size of the mapset in bytes
     */
    constructor({id, executable, parameter=[], stdout=null, stderr=[], retun_code=null, run_time=null, mapset_size=null}) {
        this.id = id; 
        this.executable = executable;
        this.parameter = [...parameter];
        this.stdout = stdout;
        this.stderr = [...stderr];
        this.retunCode = retun_code;
        this.runTime = run_time;
        this.mapsetSize = mapset_size;
    }

    /**
     * Method to parser stdout return by GRASS
     * @param {String} sep - Delimiter seperating columns 
     * @returns {Object}
     */
    parserStdout(sep='|') {
        let rows = this.stdout.split('\n').map(a=> a.split(sep))
        const obj = rows[0].reduce((accumulator, element, index) => {
            return {...accumulator, [element]: rows[1][index]};
        }, {});
        return obj
    }

    /**
     * Helper function to parse stdout from a GRASS execuatable.
     * @param {String} executable - The name of the execuatable e.g. r.univar
     * @param {String} sep - The delimiter seperating columns
     * @returns Json object of univar statistics output
     */
    static univarJson(executable, sep="|") {
        return executable.map(e => {
        let rows = e.stdout.split('\n').map(a=> a.split(sep))
        const obj = rows[0].reduce((accumulator, element, index) => {
            return {...accumulator, [element]: rows[1][index]};
        }, {});
        return obj
    })
 }

}
