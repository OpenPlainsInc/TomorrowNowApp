/*
 * Filename: nhdPlus.js
 * Project: TomorrowNow
 * File Created: Wednesday March 30th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Wed Apr 06 2022
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


/*
 * Filename: nlcd.js
 * Project: TomorrowNow
 * File Created: Wednesday March 30th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Wed Mar 30 2022
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


import TileWMS from 'ol/source/TileWMS'
import ImageArcGISRest from 'ol/source/ImageArcGISRest';
import {Image as ImageLayer} from 'ol/layer';
import wmsUtils from './wmsUtils';





const nhdPlusSource = (params) => {
    // https://hydro.nationalmap.gov/arcgis/rest/services/NHDPlus_HR/MapServer?f=pjson
    let defaults = {
        'layerName':'WBDHU12',
        'LAYERS': `11`, 
        // 'TILED': true
    }
    let updatedParams = Object.assign({}, defaults, params)

    // let serviceData = wmsUtils.fetchServiceDetails('https://hydro.nationalmap.gov/arcgis/rest/services/NHDPlus_HR/MapServer')
    // console.log("nhdPlusSource serviceData: ", serviceData)
    // serviceData.then(data=> {
        // let layer = data.layers.find(layer=> {
        //     if (layer.name === updatedParams.layerName) {
        //         return true
        //     }
        // })
        // console.log("LayerId: ", layer)
    
        // updatedParams.LAYERS = layer.id
    
    
        console.log("NHDPlus Params: ", updatedParams)
        const tileWMS =  new TileWMS({
            // url: 'https://www.mrlc.gov/geoserver/mrlc_display/NLCD_2019_Land_Cover_L48/wms',
            url: 'https://hydro.nationalmap.gov/arcgis/services/NHDPlus_HR/MapServer/WMSServer',
            params: updatedParams,
            serverType: 'mapserver',
            // Countries have transparency, so do not fade tiles:
            transition: 0
            // attributions: 
          })

        // const imageLayer = new ImageLayer({
        //     source: new ImageArcGISRest({
        //       ratio: 1,
        //       params: {},
        //       url: 'https://hydro.nationalmap.gov/arcgis/rest/services/NHDPlus_HR/MapServer',
        //     }),
        //   })

        return tileWMS
    // })
    
}


export default nhdPlusSource