/*
 * Filename: nlcd.js
 * Project: TomorrowNow
 * File Created: Wednesday March 30th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Sun May 08 2022
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

// https://openlayers.org/en/latest/apidoc/module-ol_source_TileWMS-TileWMS.html

// Multi-Resolution Land Characteristics (MRLC) Consortium Services
// https://www.mrlc.gov/data-services-page
import TileWMS from 'ol/source/TileWMS'
import TileWMSSource from './TileWMS'
export const nlcdSource = (params) => {
    let yearOptions = {
        '2019':'2019',
        '2016':'2016',
        '2013':'2013',
        '2011':'2011',
        '2008': '2008',
        '2006':'2006',
        '2004': '2004',
        '2001': '2001'
    }

    let defaultYear = yearOptions['2019']

    let dataTypeOptions = {
        'land_cover': 'Land_Cover',
        'impervious' : 'Impervious',
        'impervious_descriptor': 'Impervious_descriptor',
        'tree_canopy': 'Tree_Canopy'
    }
    
    let defaultDataType = dataTypeOptions.land_cover

    let defaultRegionOptions = {
        'L48': 'L48'
    }

    let specialLayers = {
        "NLCD_01-19_Land_Cover_Change_First_Disturbance_Date": "NLCD_01-19_Land_Cover_Change_First_Disturbance_Date",
        "NLCD_Forest_Disturbance_Date_1986-2019": "NLCD_Forest_Disturbance_Date_1986-2019"
    }

    let defaultRegion = defaultRegionOptions.L48

    let defaults = {
        'LAYERS': `mrlc_display:NLCD_${defaultYear}_${defaultDataType}_${defaultRegion}`, 
        'TILED': true
    }
    let updatedParams = Object.assign({}, defaults, params)
    console.log("NLCD Params: ", updatedParams)
    const tileWMS =  new TileWMS({
        url: 'https://www.mrlc.gov/geoserver/mrlc_display/wms',
        params: updatedParams,
        serverType: 'geoserver',
        transition: 0
       
      })
      
    return tileWMS
}