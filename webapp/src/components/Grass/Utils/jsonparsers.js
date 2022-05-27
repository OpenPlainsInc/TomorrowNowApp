/*
 * Filename: jsonparsers.js
 * Project: TomorrowNow
 * File Created: Tuesday May 24th 2022
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


class InputParameter {

}
class OutputParameter {

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