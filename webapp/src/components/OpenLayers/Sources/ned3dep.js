/*
 * Filename: ned3dep.js
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

// Multi-Resolution Land Characteristics (MRLC) Consortium Services
// https://www.mrlc.gov/data-services-page
import TileWMS from 'ol/source/TileWMS'

export const ned3DepSource = (params) => {
 
     // https://apps.nationalmap.gov/services/
    // https://elevation.nationalmap.gov/arcgis/services/3DEPElevation/ImageServer/WMSServer?request=GetCapabilities&service=WMS
    // https://elevation.nationalmap.gov/arcgis/rest/services/3DEPElevation/ImageServer
    // TODO: Just ingest all of this metadata from the web service json
    // https://elevation.nationalmap.gov/arcgis/rest/services/3DEPElevation/ImageServer/rasterFunctionInfos?f=pjson
    let layerOptions = {
        'Hillshade Gray':'Hillshade Gray',
        'Aspect Degrees':'Aspect Degrees',
        'Aspect Map':'Aspect Map',
        'Contour 25':'Contour 25',
        'Hillshade Elevation Tinted':'Hillshade Elevation Tinted',
        'Height Ellipsoidal':'Height Ellipsoidal',
        'GreyHillshade_elevationFill':'GreyHillshade_elevationFill',
        'Hillshade Multidirectional':'Hillshade Multidirectional',
        'Slope Map':'Slope Map',
        'Slope Degrees':'Slope Degrees',
        'Contour Smoothed 25':'Contour Smoothed 25',
        'None':'None'
    }

    let defaults = {
        layer: layerOptions['Hillshade Gray']
    }
   



    let updatedParams = Object.assign({}, defaults, params)
    console.log("Ned3Dep Params: ", updatedParams)
    const tileWMS =  new TileWMS({
        // url: 'https://www.mrlc.gov/geoserver/mrlc_display/NLCD_2019_Land_Cover_L48/wms',
        url: 'https://elevation.nationalmap.gov/arcgis/services/3DEPElevation/ImageServer/WMSServer',
        params: {'LAYERS': `3DEPElevation:${updatedParams.layer}`, 'TILED': true},
        serverType: 'mapserver',
        // Countries have transparency, so do not fade tiles:
        transition: 0
      })
    return tileWMS
}