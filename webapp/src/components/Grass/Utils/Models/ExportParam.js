/*
 * Filename: ExportParam.js
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

import { ExportFormat, ExportType, STACMetadataFormat } from "./Enums";

/**
 * @description The raster, vector or text file export parameter.
 * @param {Enum.ExportFormat} format format of the output file in case of raster, strds, vector layer or text file export.
 * @param {Enum.ExportType} type The type of the output.
 * @param {String} [dbstring = undefined] The database string to be used to connect to a PostgreSQL database for vector export.
 * @param {String} [output_layer = undefined] Name for output PostgreSQL layer. If not specified, GRASS GIS vector map layer name is used.
 */
 export class ExportParam {
    constructor(format, type, dbstring=undefined, output_layer=undefined) {
        this.format = ExportFormat[format];
        this.type = ExportType[type];
        this.dbstring = dbstring;
        this.outputLayer = output_layer;
    }
}