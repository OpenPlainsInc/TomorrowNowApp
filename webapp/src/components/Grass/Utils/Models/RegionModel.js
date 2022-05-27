/*
 * Filename: RegionModel.js
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
 * @actinia
 * Actinia class representing the output of GRASS GIS module g.region -gu3
 */
export class RegionModel {
    /**
     * Create a region
     * @param {Number} projection - The mapset projection
     * @param {Number} zone - 
     * @param {Number} n - Value for the northern edge
     * @param {Number} s - Value for the southern edge
     * @param {Number} e - Value for the eastern edge
     * @param {Number} w - Value for the western edge
     * @param {Number} t - Value for the  edge
     * @param {Number} b - Value for the  edge
     * @param {Number} nsres - Value for the  north south resolution
     * @param {Number} nsres3 - Value for the north south 3d resolution
     * @param {Number} ewres - Value for the  east west resolution
     * @param {Number} ewres3 - Value for the east west 3d resolution
     * @param {Number} tbres - Value for the tbres resolution
     * @param {Number} rows - The number of rows
     * @param {Number} rows3 - The number of 3d rows
     * @param {Number} cols - The number of columns
     * @param {Number} cols3 - The number of 3d columns
     * @param {Number} depths - The depths value
     * @param {Number} cells - The number of cells
     * @param {Number} cells3 - The number of 3d cells
     */
    constructor({projection, zone, n, s, e, w, t, b, nsres, nsres3, ewres, ewres3, tbres, rows, rows3, cols, cols3, depths, cells, cells3}) {
        this.projection = projection;
        this.zone = zone;
        this.n = n;
        this.s = s;
        this.e = e;
        this.w = w;
        this.t = t;
        this.b = b;
        this.nsres = nsres;
        this.nsres3 = nsres3;
        this.ewres = ewres;
        this.ewres3 = ewres3;
        this.tbres = tbres;
        this.rows = rows;
        this.rows3 = rows3;
        this.cols = cols;
        this.cols3 = cols3;
        this.depths = depths;
        this.cells = cells;
        this.cells3 = cells3;
    }
}
