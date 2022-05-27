/*
 * Filename: EpsgInfo.js
 * Project: TomorrowNow
 * File Created: Thursday May 26th 2022
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
 * Class representing espg info return by epsg.io query.
 */
 export class EpsgInfo {
    /**
     * Create an EpsgInfo
     * @param {String} code - The epsg code
     * @param {String} kind - The kind of projection e.g. CRS-GEOGCRS
     * @param {Array | String} [bbox = ""] - The bounding box of the projection e.g. [90, -180, -90, 180]
     * @param {String} [wkt = ""] - The wkt represention of the projection
     * @param {String} [unit = ""] - The measurment unit e.g. degree, meter, feet.
     * @param {String} [proj4 = ""] - The proj4 representation e.g. +proj=longlat +datum=WGS84 +no_def
     * @param {String} [name = ""] - The projection name. e.g. WGS 84
     * @param {String} [area = ""] - The area of the projection e.g. World.
     * @param {Number} [default_trans = 0] - Default transform coordinates.
     * @param {Array} [trans = []] - Array of transform coordinates
     * @param {String} [accuracy = ""] - The accuracy
     */
    constructor({code, kind, bbox = "", wkt = "", unit = "", proj4 ="", name = "", area = "", default_trans = 0, trans = [], accuracy}) {
        this.code = code;
        this.kind = kind;
        this.bbox = Array.isArray(bbox) ? bbox : null;
        this.wkt = wkt;
        this.unit = unit;
        this.proj4 = proj4;
        this.name = name;
        this.area = area;
        this.defaultTrans = default_trans;
        this.trans = [...trans];
        this.accuracy = accuracy;
    }
}