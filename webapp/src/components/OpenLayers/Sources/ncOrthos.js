/*
 * Filename: ncOrthos.js
 * Project: TomorrowNow
 * File Created: Thursday March 31st 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Fri Apr 01 2022
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
 * NCOneMap
 * https://www.nconemap.gov/pages/announcements
 * True Color (Statewide) 
 *    Web Service: https://services.nconemap.gov/secure/rest/services/Imagery/Orthoimagery_Latest/ImageServer
 *    Tiles (Download): https://nconemap.maps.arcgis.com/apps/webappviewer/index.html?id=2c8a9b366c4841f1be2b464347d04a2b
 *    Mosaic (Download): https://assets.nconemap.gov/pages/hub/ncom-imagery-dd.htm
 * Color Infrared (Statewide)
 *    Web Service: https://services.nconemap.gov/secure/rest/services/Imagery/Orthoimagery_CIR/ImageServer
 *    Tiles (Download):  https://nconemap.maps.arcgis.com/apps/webappviewer/index.html?id=2c8a9b366c4841f1be2b464347d04a2b
 *    Mosaic (Download): https://assets.nconemap.gov/pages/hub/ncom-imagery-dd.htm
 * NDVI
 *    Web Service: https://services.nconemap.gov/secure/rest/services/Imagery/Orthoimagery_NDVI/ImageServer
 * True Color (2021 only)
 *    Web Service: https://services.nconemap.gov/secure/rest/services/Imagery/Orthoimagery_2021/ImageServer
 *    Tiles (Download): https://nconemap.maps.arcgis.com/apps/webappviewer/index.html?id=2c8a9b366c4841f1be2b464347d04a2b
 *    Mosaic (Download): https://assets.nconemap.gov/pages/hub/ncom-imagery-dd.htm
 */



import TileWMS from 'ol/source/TileWMS'
import ImageArcGISRest from 'ol/source/ImageArcGISRest';
import {Image as ImageLayer} from 'ol/layer';
import wmsUtils from './wmsUtils';
        

        
        
        
const ncOrthosSource = (params) => {
    // https://www.nconemap.gov/datasets/nconemap::2020-orthoimagery/about
    // https://services.nconemap.gov/secure/rest/services/Imagery/Orthoimagery_2020/ImageServer
    let defaults = {
       
    }
    let updatedParams = Object.assign({}, defaults, params)
            
            
    console.log("ncOrthosSource Params: ", updatedParams)
        
    
    const imageLayer = new ImageLayer({
        source: new ImageArcGISRest({
            ratio: 1,
            params: {},
            url: 'https://services.nconemap.gov/secure/rest/services/Imagery/Orthoimagery_2020/ImageServer',
        }),
    })
        
    return imageLayer
            
}
        
        
export default ncOrthosSource