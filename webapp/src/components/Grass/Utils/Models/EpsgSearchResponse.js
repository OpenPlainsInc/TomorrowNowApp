/*
 * Filename: EpsgSearchResponse.js
 * Project: TomorrowNow
 * File Created: Thursday May 26th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Fri May 27 2022
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
import { EpsgInfo } from "./EpsgInfo";

/**
 * Class representing json search response from epsg.io
 */
 export class EpsgSearchResponse {
    /**
     * Create a EpsgSearchResponse object
     * @param {String} status - Resposne status e.g. "ok"
     * @param {Number} number_result - The number of return results.
     * @param {Array.<EpsgInfo} [results = []] List of return epsg info.
     */
    constructor({status, number_result, results}) {
        this.status = status;
        this.number_result = number_result;
        this.results = results.map(r => new EpsgInfo({...r}));
    }

}
