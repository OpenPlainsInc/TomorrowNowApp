/*
 * Filename: StdoutParser.js
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


import { StdoutFormat } from "./Enums";

/**
 * @description Use this parameter to automatically parse the output of GRASS GIS modules and convert the output into tables, lists or key/value pairs in the result section of the response.If the property type is set to *table*, *list* or *kv* then the stdout of the current command will be parsed and the result of the parse operation will be added to the result dictionary using the provided id as key. GRASS GIS modules produce regular output. Many modules have the flag *-g* to create key value pairs as stdout output. Other create a list of values or a table with/without header.
 * @param {String} id The unique id that is us… the result dictionary.
 * @param {String} format The stdout format to be parsed.
 * @param {String} delimiter The delimiter that should be used to parse table, list and key/value module output. Many GRASS GIS  modules use by default \"|\" in tables and \"=\" in key/value pairs. A new line \"\\n\" is always the delimiter between rows in the output.
 */
export class StdoutParser {
    constructor({id, format, delimiter}) {
        this.id = id;
        this.format = new StdoutFormat(format).validate();
        this.delimiter = delimiter
    }
}