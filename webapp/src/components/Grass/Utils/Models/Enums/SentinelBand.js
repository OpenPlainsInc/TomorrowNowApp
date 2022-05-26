/*
 * Filename: SentinelBand.js
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
 * @description The band of the sentinel2 scene that should be imported.
 * @param {String} name The band of the sentinel2 scene that should be imported.
 */
 export class SentinelBand {
    static B01 = new SentinelBand('B01');
    static B02 = new SentinelBand('B02');
    static B03 = new SentinelBand('B03');
    static B04 = new SentinelBand('B04');
    static B05 = new SentinelBand('B05');
    static B06 = new SentinelBand('B06');
    static B07 = new SentinelBand('B07');
    static B08 = new SentinelBand('B08');
    static B8A = new SentinelBand('B8A');
    static B09 = new SentinelBand('B09');
    static B10 = new SentinelBand('B10');
    static B11 = new SentinelBand('B11');
    static B12 = new SentinelBand('B12');

    constructor(name) {
        this.name = name;
    }

    toString() {
        return `SentinelBand.${this.name}`
    }
}