/*
 * Filename: StdoutFormat.js
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


/**
 * @description Enum class of the stdout format to be parsed.
 * @param {String} name The format type being accessed.
 */
 export class StdoutFormat {
    static table = new StdoutFormat('table');
    static list = new StdoutFormat('list');
    static kv = new StdoutFormat('kv');
    static json = new  StdoutFormat('json');

    constructor(name) {
        this.name = name;
    }

    validate() {
        if (!Object.keys(StdoutFormat).includes(this.name)) throw Error(`Stdout format '${this.name}' is not a valid option`)
        return this.name
    }

    toList() {
        return Object.keys(StdoutFormat).forEach(option => option)
    }

    toString() {
        return `StdoutFormat.${this.name}`
    }
}