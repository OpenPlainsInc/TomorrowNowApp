/*
 * Filename: ExportFormat.js
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
 * @description The format of the output file in case of raster, strds, vector layer or text file export. Raster layer export supports only GTiff and COG format, STRDS layer export supports only GTiff format and all other formats are vector layer export formats. If the *PostgeSQL* format was chosen, a postgis database string *dbstring* must be provided  so that the GRASS GIS module *v.out.ogr knows to which PostgreSQL database it should be connect. The name of the output layer can be specified as *output_layer* for PostgreSQL database exports. Some GRASS GIS modules allow the export of text files. These files can be exported and provided as downloadable link as well.
 * @param {String} name The export format type being accessed.
 */
 export class ExportFormat {
    static COG = new ExportFormat('COG');
    static GTiff = new ExportFormat('GTiff');
    static GPKG = new ExportFormat('GPKG');
    static SQLite = new ExportFormat('SQLite');
    static GML = new ExportFormat('GML');
    static GeoJSON = new ExportFormat('GeoJSON');
    static ESRI_Shapefile = new ExportFormat('ESRI_Shapefile');
    static CSV = new ExportFormat('CSV');
    static TXT = new ExportFormat('ESRI_Shapefile');
    static PostgreSQL = new ExportFormat('PostgreSQL');

    constructor(name) {
        this.name = name;
    }

    toString() {
        return `ExportFormat.${this.name}`
    }
}