/*
 * Filename: InputType.js
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
 * @description The type of the input that should be downloaded and imported. In case of raster or vector types a download URL must be provided as source using http, https or ftp protocols. In case of sentinel2  scenes the scene name and the band must be provided. The Landsat approach is different. <br><br>In case a Landsat scene is requested, all bands will be download, in the target location imported and an atmospheric correction is applied. The atmospheric correction must be specified. The resulting raster map layers have a specific name scheme, that is independent from the provided map name in the process description. The name scheme is always: <p>\\<landsat scene id\\>_\\<atcor\\>.\\<band\\></p>For example, if the scene <p>LT52170762005240COA00</p> was requested, the resulting name for the DOS1 atmospheric corrected band 1 would be: <p>LT52170762005240COA00_dos1.1</p>.For the DOS1 atmospheric corrected band 2 it would be: <p>LT52170762005240COA00_dos1.2</p> and so on. All other process steps must use these raster map layer names to refer to the imported Landsat bands. Use the file option to download any kind of files that should be processed by a grass gis module.
 * @param {String} name The import data format type.
 */
 export class InputType {
    static raster = new InputType('raster');
    static vector = new InputType('vector');
    static file = new InputType('file');
    static landsat = new InputType('landsat');
    static sentinel2 = new InputType('sentinel2');
    static postgis = new InputType('postgis');
    static stac = new InputType('stac');

    constructor(name) {
        this.name = name;
    }

    toString() {
        return `InputType.${this.name}`
    }
}
