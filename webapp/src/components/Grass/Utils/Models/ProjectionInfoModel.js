/*
 * Filename: ProjectionInfoModel.js
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

import { EpsgSearchResponse } from "./EpsgSearchResponse";

/**
 * @Version Actinia 4.0.1
 * Actinia class mapping representing the schema to define projection information as JSON input in POST requests
 */
export class ProjectionInfoModel {
    static EPSGIO_BASE_URL = "https://epsg.io/"
    /**
     * Create a ProjectionInfoModel instance
     * @param {Object}
     * @param {String} epsg The EPSG code of the projection that should be used to create a location.
     */
    constructor({epsg}) {
        this.epsg = epsg;
        this.projectionDetails = {}
    }

    /**
     * Fetch details about projection from epsg.io
     * @returns ProjectionInfoModel with parameter projectionDetails containing projection details 
     */
    async fetchDetails() {
        let epsg = this.epsg
        const results = await ProjectionInfoModel.searchEpsg(epsg).results;
        console.log(results);
        if (results) {
            this.projectionDetails = results.map(result => {
                let projDetails = {};
                if (result) {
                    const code = result.code;
                    const name = result.name;
                    const proj4def = result.proj4;
                    const bbox = result.bbox;
      
                    if (code && code.length > 0 && proj4def && proj4def.length > 0 && bbox && bbox.length === 4) {
                        projDetails = {
                            code,
                            name,
                            proj4def,
                            bbox
                        }
                    }  
                }
                return projDetails;
            })
        }
        return this
    }

    /**
     * Search for details for a specific epsg code.
     * @param {String} epsg 
     * @returns {EpsgSearchResponse} Repsone from epsg.io or error response.
     */
    static async searchEpsg(epsg) {
        try {
            const url = new URL(`${this.EPSGIO_BASE_URL}?format=json&q=${epsg}`)
            const res = await fetch(url);
            const data = await res.json();
            
            const response = await new EpsgSearchResponse({...data})
            console.log("epsg.io response:", response)
            return response
        }
        catch(e) {
            console.log("Search Failed");
            return null;
        }
    }
}