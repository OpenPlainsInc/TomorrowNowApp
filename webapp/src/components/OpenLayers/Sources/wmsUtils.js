/*
 * Filename: wmsUtils.js
 * Project: TomorrowNow
 * File Created: Thursday March 31st 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Thu Mar 31 2022
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


import OSM from 'ol/source/OSM'

async function fetchServiceDetails(url, queryparams={}) {
    /** 
     * Fetches metadata from ArcGIS Services (FeatureService, MapService, etc...) 
     * 
     * 
     * **/
    try {
        let _url = new URL(url)
        let updatedParams = Object.assign({}, {f:'pjson'}, queryparams)

        _url.search = new URLSearchParams(updatedParams).toString();
        const res = await fetch(_url);
        const data = await res.json();
        console.info('NHDPlus Service Info', data)
        return data
    }
    catch (e) {
        console.error("NHDPlus Service Responsed with an error:", e)
    }
}

const wmsUtils = (() => {
    
    const utils = {
        fetchServiceDetails
    }


    return utils
})()

export default wmsUtils