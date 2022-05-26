/*
 * Filename: Extent.js
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
 * @param {Array.<Array>} bbox Bounding Box for the extent
 * @example [[30.192, -16.369, 42.834, -0.264]]
 */
class SpatialExtent {
    constructor(bbox) {
        this.bbox = bbox;
    }
}


/**
 * @param {Array} interval Start and end date.
 * @example [["2022-05-01", "2022-05-25"]]
 */
class TemporalExtent {
    constructor(interval) {
        this.interval = interval;
    }
}

/**
 * @description Spatio-temporal constraint defined by the userthroughout bbox and interval concept.
 * @param {String} name The export format type being accessed.
 */
 export class Extent {
    static spatial = new Extent('spatial');
    static temporal = new Extent('temporal');

    constructor(name) {
        this.name = name;
    }

    toString() {
        return `Extent.${this.name}`
    }
}