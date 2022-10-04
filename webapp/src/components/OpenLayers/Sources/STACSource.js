/*
 * Filename: STACSource.js
 * Project: TomorrowNow
 * File Created: Wednesday September 14th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Wed Sep 14 2022
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
import GeoTIFFSource from 'ol/source/GeoTIFF';
import Raster from 'ol/source/Raster';
import WebGLTile from 'ol/source/WebGLTile';
import Source from 'ol/source/Source';


/**
 * @class
 * Class to ingest a STAC catalog
 * @param {string} stacAPIUrl - STAC API url
 * @param {string|string[]} collection - The STAC collection
 * @param {string} asset - The STAC asset type
 * @param {[]} bbox - the seach path bounding box
 * @param {string} datetime - The datetime range e.x. "2020-12-01/2020-12-31"
 * @param {number} [maxItems = 10] - The maximum number of returned assests.
 */
export default class STACSource extends GeoTIFFSource {
    constructor({stacAPIUrl, collection, asset, bbox, datetime, maxItems=10}){
        super()
        this.stacAPIUrl = stacAPIUrl;
        this.collection = collection;
        this.asset = asset;
        this.bbox = bbox;
        this.datetime = datetime;
        this.maxItems = maxItems;
    }

    /**
     * Fetch assets from source
     */
    async fetchAssets() {

    }
}