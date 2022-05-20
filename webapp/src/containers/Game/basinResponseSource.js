/*
 * Filename: basinResponseSource.js
 * Project: TomorrowNow
 * File Created: Monday May 2nd 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Thu May 19 2022
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

const basinResponseSource = ((onAddFeature)=> {

    const serviceUrl = "http://localhost:8600/geoserver/savana/ows?" + 
        "service=WFS&version=1.0.0&request=GetFeature&typeName=savana%3Apoint_basin_cloud&" +
        "maxFeatures=50&outputFormat=application%2Fjson&srsName=EPSG:4326"
    const layer = 0

    const geojsonFormat = new GeoJSON();
 
    const vectorSource = new VectorSource({
        loader: async (extent, resolution, projection, success, failure) => {
          const url = new URL(serviceUrl)

            const res = await fetch(url, {
                method: "GET",
                cache: "reload"
            });
            const data = await res.json();
            console.log("Basin Geojson", data)
            const features = geojsonFormat.readFeatures(data, {
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

export default {
  source: basinResponseSource
}
