/*
 * Filename: survey.js
 * Project: TomorrowNow
 * File Created: Wednesday April 6th 2022
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


// 'https://services1.arcgis.com/aT1T0pU1ZdpuDk1t/ArcGIS/rest/services/'
// '0/query?f=json&returnGeometry=true&inSR=102100&outFields=*&outSR=4326&where=1=1`'
import EsriJSON from 'ol/format/EsriJSON';
import VectorSource from 'ol/source/Vector';
import {tile as tileStrategy} from 'ol/loadingstrategy';
import {createXYZ} from 'ol/tilegrid';

export const survey = ((onAddFeature)=> {

    const serviceUrl = 'https://services1.arcgis.com/aT1T0pU1ZdpuDk1t/ArcGIS/rest/services/' +
    'survey123_571499fe84ac4125abe48b793b9970a3_stakeholder/FeatureServer/'
    const layer = 0

    const esrijsonFormat = new EsriJSON();
    // async function fetchRasters() 
    const vectorSource = new VectorSource({
        loader: async (extent, resolution, projection, success, failure) => {
          const url = new URL(
            serviceUrl +
            layer +
            '/query/?f=json&' +
            'returnGeometry=true&outFields=*' +
            '&spatialRel=esriSpatialRelIntersects&geometry=' +
            encodeURIComponent(
              '{"xmin":' +
                extent[0] +
                ',"ymin":' +
                extent[1] +
                ',"xmax":' +
                extent[2] +
                ',"ymax":' +
                extent[3] +
                ',"spatialReference":{"wkid":4326}}'
            ) +
            '&geometryType=esriGeometryEnvelope&inSR=4326&outFields=*' +
            '&outSR=4326')

            const res = await fetch(url, {
                method: "GET",
                cache: "reload"
            });
            const data = await res.json();
            const features = esrijsonFormat.readFeatures(data, {
                featureProjection: projection,
            });
            if (features.length > 0) {
                vectorSource.addFeatures(features);
            }

        },
        strategy: tileStrategy(
          createXYZ({
            tileSize: 512,
          })
        ),
      });

      if (onAddFeature) {
        vectorSource.on('change', onAddFeature)
      }
      

      return vectorSource
})


