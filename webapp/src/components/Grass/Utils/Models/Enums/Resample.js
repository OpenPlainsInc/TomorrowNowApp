/*
 * Filename: Resample.js
 * Project: TomorrowNow
 * File Created: Wednesday May 25th 2022
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


/**
 * Class representing enumeration of resampling methods to use for reprojection of raster map.
 * @param {String} name The resampling methed
 */
 export class Resample {
    static nearest = new Resample('nearest');
    static bilinear = new Resample('bilinear');
    static bicubic = new Resample('bicubic');
    static lanczos = new Resample('lanczos');
    static bilinear_f = new Resample('bilinear_f');
    static bicubic_f = new Resample('bicubic_f');
    static lanczos_f = new Resample('lanczos_f');

    constructor(name) {
        this.name = name;
    }

    toString() {
        return `Resample.${this.name}`
    }
}