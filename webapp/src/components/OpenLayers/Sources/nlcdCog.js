/*
 * Filename: nlcdCog.js
 * Project: TomorrowNow
 * File Created: Tuesday May 3rd 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Wed May 04 2022
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

    // return (async () => {
    //     let tilejson = await new TileJSON({
    //         url: tileJsonUrl,
    //         crossOrigin: 'anonymous'
    //     })

    //     let tileGrid = await tilejson.getTileGrid()
    //     console.log("TileGrid", tileGrid)

    //     let source = await sourcesFromTileGrid(
    //         tileGrid,
    //         ([z, x, y]) =>
    //           new GeoTIFF({
    //             sources: [
    //               {
    //                 url:`http://localhost:7000/cog/tiles/WebMercatorQuad/${z}/${x}/${y}@1x?url=https%3A%2F%2Fstorage.googleapis.com%2Ftomorrownow-actinia-dev%2Fnlcd%2Fnlcd_2019_cog.tif&bidx=1&expression=b1%2Fb2&unscale=false&resampling=nearest&rescale=0%2C2000&rescale=0%2C1000&rescale=0%2C10000&return_mask=true`,
    //               },
    //             ],
    //           })
    //       )
    //       console.log("Source", source)

    
    //     return source


    // })()

    let tilejson = new TileJSON({
        url: tileJsonUrl,
        crossOrigin: 'anonymous'
    })
    console.log("TileJson", tilejson)

    // let tileGrid = tilejson.getTileGrid()
    let tileGrid = new TileGrid({
        extent: [-20037508.342789244, -20037508.342789244, 20037508.342789244, 20037508.342789244],
        resolutions: [
            156543.03392804097,
            78271.51696402048,
            39135.75848201024,
            19567.87924100512,
            9783.93962050256,
            4891.96981025128,
            2445.98490512564,
            1222.99245256282,
            611.49622628141,
            305.748113140705,
            152.8740565703525,
            76.43702828517625,
            38.21851414258813],
        tileSize: [256],
      })
    console.log("TileGrid", tileGrid)

    let source = sourcesFromTileGrid(
        tileGrid,
        ([z, x, y]) =>
          new GeoTIFF({
            sources: [
              {
                url:`http://localhost:7000/cog/tiles/WebMercatorQuad/${z}/${x}/${y}@1x?url=https%3A%2F%2Fstorage.googleapis.com%2Ftomorrownow-actinia-dev%2Fnlcd%2Fnlcd_2019_cog.tif&bidx=1&expression=b1%2Fb2&unscale=false&resampling=nearest&rescale=0%2C2000&rescale=0%2C1000&rescale=0%2C10000&return_mask=true`,
              },
            ],
          })
      )
    //   console.log("Source", source())


    return source

     
}

export default nlcdCOGTileGridSource