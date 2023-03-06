/*
 * Filename: nlcdCog.js
 * Project: TomorrowNow
 * File Created: Tuesday May 3rd 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Tue Sep 20 2022
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

import TileJSON from 'ol/source/TileJSON'
import {sourcesFromTileGrid} from 'ol/source';
import GeoTIFF from 'ol/source/GeoTIFF';
import Projection from "ol/proj/Projection";


export const getColorMap = async ({layer = 2019}) => {
    let url = `https%3A%2F%2Fstorage.googleapis.com%2Ftomorrownow-actinia-dev%2Fnlcd%2Fnlcd_${layer}_cog.tif`
    const baseUrl = "http://localhost:7000/cog/info?" +
                    `url=${url}`

    const response = await fetch(baseUrl)
    const respJson = await response.json()
    const colorMap = respJson.colorMap
    return colorMap

}


export const nlcdCOGTileGridSource = ({layer = 2019}) => {
    // const tileFormat = 'png'
    // const sourceCog = `https%3A%2F%2Fstorage.googleapis.com%2Ftomorrownow-actinia-dev%2Fnlcd%2Fnlcd_${layer}_cog.tif`
    // const tileJsonUrl = `http://localhost:7000/cog/tilejson.json?tile_format=${tileFormat}&tile_scale=1&TileMatrixSetId=WebMercatorQuad&url=${sourceCog}&bidx=1&resampling=nearest&return_mask=true`
    
    // let tileJson = new TileJSON({
    //     url: tileJsonUrl,
    //     crossOrigin: 'anonymous',
    //     interpolate: false,
    //     tileSize: [512,512],
    //     transition: 0
    // })
    

    // console.log("nlcdCOGTileGridSource", tileJson)
    // return tileJson

    const projection = new Projection({
        code: 'EPSG:5070',
        units: 'metre',
        // axisOrientation: 'neu'
        });

    const source = new GeoTIFF({
        sources: [
          {
            // url: 'https://storage.googleapis.com/tomorrownow-actinia-dev/nlcd/nlcd_2016_cog.tif',
            url: `https://storage.googleapis.com/tomorrownow-actinia-dev/nlcd/nlcd_${layer}_cog.tif`
          }
        ],
        sourceOptions: {
            forceXHR: false,
            headers: {
                'Content-Type': 'image/tiff; application=geotiff; profile=cloud-optimized',
            }
        },
        normalize: false,
        opaque: false,
        interpolate: false,
        wrapX: true,
        projection
    })

    console.log("GeoTiffSource", source)

    return source

}