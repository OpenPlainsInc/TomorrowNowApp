/*
 * Filename: hucBoundaries.js
 * Project: TomorrowNow
 * File Created: Sunday May 8th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Wed Sep 21 2022
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

import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import {tile as tileStrategy} from 'ol/loadingstrategy';
import {createXYZ} from 'ol/tilegrid';
import { Style, Stroke, Fill } from 'ol/style';
const HUCUNITS = {
    WBDLINE: 0,
    HUC2: 1, // Region
    HUC4: 2, // Subregion
    HUC6: 3, // Basin
    HUC8: 4, // Subbasin
    HUC10: 5, // Watershed
    HUC12: 6, // Subwatershed
    HUC14: 7, 
    HUC16: 8
}

export const hucStyle = () => {
    return new Style({
        stroke: new Stroke({
          color: 'rgba(52, 153, 204, 0.75)',
          width: 2,
        }),
        fill: new Fill({
            color: 'rgba(20,20,20,0.0)',
        })
      })
}

export const countyStyle = (width=3) => {
  return new Style({
      stroke: new Stroke({
        color: 'rgba(94, 94, 94, 0.75)',
        width: width,
      }),
      fill: new Fill({
          color: 'rgba(20,20,20,0.0)',
      })
    })
}

export const streamStyle = () => {
  return new Style({
      stroke: new Stroke({
        color: 'rgba(44, 223, 255, 0.9)',
        width: 2,
      }),
      fill: new Fill({
        color: 'rgba(20,20,20,0.0)',
    })
    })
}

export const selectStyle = new Style({
  fill: new Fill({
    color: 'rgba(255, 255, 255, 0.0)',
  }),
  stroke: new Stroke({
    color: 'rgba(255, 255, 255, 0.7)',
    width: 6,
  }),
});

const stylize = (selectedFeatureId) => {
  return (feature) => {
    if (feature.getId() === selectedFeatureId) {
      return selectStyle;
    }
    return hucStyle
  }
}


export const hucBoundaries = (unit) => {

    const layer = HUCUNITS[unit]
    const BASE_URL = `https://hydrowfs.nationalmap.gov/arcgis/rest/services/wbd/MapServer/${layer}/query/?`
    const geojsonFormat = new GeoJSON()
    const vectorSource = new VectorSource({
        loader: async (extent, resolution, projection) => {
            const url = new URL(
                BASE_URL +
                'f=geojson&' +
                'returnGeometry=true&' +
                'outFields=*&' +
                'spatialRel=esriSpatialRelIntersects&' +
                'geometry=' +
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
                '&outSR=4326'
            )
            try {
                const res = await fetch(url, {
                    method: "GET",
                    headers: {}
                })
                const data = await res.json();
                // const tmpFeatures = await data.features
                const features = geojsonFormat.readFeatures(data, { featureProjection: projection})
                console.log("HUC 12 data", data)
                if (features.length > 0) {
                    vectorSource.addFeatures(features);
                }
            } catch (e) {
                console.warn("hucBoundaries Request Error", e);
            }
           
        },
        strategy: tileStrategy(
            createXYZ({
              tileSize: 512,
            })
          )
      });

      return vectorSource;

}