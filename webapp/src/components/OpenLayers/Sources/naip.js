/*
 * Filename: naip.js
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
 * Filename: ned3dep.js
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

export const naipSource = (params) => {
 
     // https://services.nationalmap.gov/arcgis/rest/services/USGSNAIPPlus/MapServer?f=pjson
     // https://services.nationalmap.gov/arcgis/rest/services/USGSNAIPPlus/MapServer
     // https://services.nationalmap.gov/arcgis/services/USGSNAIPPlus/MapServer/WMSServer?request=GetCapabilities&service=WMS
    let layerOptions = {
        'Image':'122', // North Carolina Image
        'Footprint':'123',
        'Boundary':'124'
    }

    let serviceOptions = {
        'USGSNAIPPlus': 'USGSNAIPPlus', // https://services.nationalmap.gov/arcgis/services/USGSNAIPPlus/MapServer/WMSServer?request=GetCapabilities&service=WMS

        'USGSNAIPImagery': 'USGSNAIPImagery' // https://services.nationalmap.gov/arcgis/services/USGSNAIPImagery/MapServer/WMSServer?request=GetCapabilities&service=WMS
    }

    let defaults = {
        layer: layerOptions['Image'],
        service: serviceOptions.USGSNAIPImagery
    }
   




    let updatedParams = Object.assign({}, defaults, params)
    console.log("NAIP Params: ", updatedParams)
    const tileWMS =  new TileWMS({
        // url: 'https://www.mrlc.gov/geoserver/mrlc_display/NLCD_2019_Land_Cover_L48/wms',
        url: `https://services.nationalmap.gov/arcgis/services/${updatedParams.service}/MapServer/WMSServer`,
        params: {'LAYERS': `${updatedParams.layer}`, 'TILED': true},
        serverType: 'mapserver',
        // Countries have transparency, so do not fade tiles:
        transition: 0
      })
    return tileWMS
}