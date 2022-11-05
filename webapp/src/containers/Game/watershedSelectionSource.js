/*
 * Filename: watershedSelectionSource.js
 * Project: TomorrowNow
 * File Created: Saturday November 5th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Sat Nov 05 2022
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

import GeoJSON from 'ol/format/GeoJSON';
import VectorSource from 'ol/source/Vector';
import {tile as tileStrategy} from 'ol/loadingstrategy';
import {createXYZ} from 'ol/tilegrid';
import React, { useEffect, useState } from 'react';

export const watershedSelectionSource = ({huc12}) => {

        console.log("Huc12", huc12)
        const serviceUrl = "http://localhost:8600/geoserver/savana/ows?service=WFS" + 
        "&version=1.0.0&request=GetFeature&typeName=savana%3Ahuc_12" +
        "&maxFeatures=50&outputFormat=application%2Fjson&PropertyName=name,huc12,geom" + 
        `&CQL_FILTER=huc12='${huc12}'&srsName=EPSG:4326`
     
        const vectorSource = new VectorSource({
            format: new GeoJSON(),
            url: serviceUrl
        })
 

    return vectorSource
}



