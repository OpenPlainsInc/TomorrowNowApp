/*
 * Filename: nlcdCog.js
 * Project: TomorrowNow
 * File Created: Tuesday May 3rd 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Tue May 03 2022
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
import TileGrid from 'ol/tilegrid/TileGrid';
import {sourcesFromTileGrid} from 'ol/source';
import GeoTIFF from 'ol/source/GeoTIFF';


const nlcdCOGSource = (params) => {

    const tileJsonUrl = "http://localhost:7000/cog/tilejson.json?tile_scale=1&TileMatrixSetId=WebMercatorQuad&url=https%3A%2F%2Fstorage.googleapis.com%2Ftomorrownow-actinia-dev%2Fnlcd%2Fnlcd_2019_cog.tif&bidx=1&expression=b1%2Fb2&unscale=false&resampling=nearest&rescale=0%2C2000&rescale=0%2C1000&rescale=0%2C10000&return_mask=true"
    const url = "http://localhost:7000/cog/tiles/WebMercatorQuad/8/73/100@1x?url=https://storage.googleapis.com/tomorrownow-actinia-dev/nlcd/nlcd_2019_cog.tif&bidx=1"

    let source = new TileJSON({
        url: tileJsonUrl,
        crossOrigin: 'anonymous'
    })

    return source
}

const nlcdCOGTileGridSource = (params) => {

    const tileJsonUrl = "http://localhost:7000/cog/tilejson.json?tile_scale=1&TileMatrixSetId=WebMercatorQuad&url=https%3A%2F%2Fstorage.googleapis.com%2Ftomorrownow-actinia-dev%2Fnlcd%2Fnlcd_2019_cog.tif&bidx=1&expression=b1%2Fb2&unscale=false&resampling=nearest&rescale=0%2C2000&rescale=0%2C1000&rescale=0%2C10000&return_mask=true"
    // let tileJson = new TileJSON({
    //     url: tileJsonUrl,
    //     crossOrigin: 'anonymous'
    // })

    // console.log(tileJson.getTileGrid())

    // const tileGrid = new TileGrid();

      let source = sourcesFromTileGrid(
        new TileJSON({
            url: tileJsonUrl,
            crossOrigin: 'anonymous'
        }).getTileGrid(),
        ([z, x, y]) =>
          new GeoTIFF({
            sources: [
              {
                url:`http://localhost:7000/cog/tiles/${z}/${x}/${y}@1x?url=https://storage.googleapis.com/tomorrownow-actinia-dev/nlcd/nlcd_2019_cog.tif&bidx=1`,
              },
            ],
          })
      )

    return source
}

export default nlcdCOGSource