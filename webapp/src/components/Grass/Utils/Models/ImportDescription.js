/*
 * Filename: ImportDescription.js
 * Project: TomorrowNow
 * File Created: Wednesday May 25th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Wed May 25 2022
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

import { Extent, ImportType, LandsatActor, Resample, Resolution, SentinelBand } from "./Enums"

/**
 * @description Definition of sources to be imported as raster or vector map layer.
 * @param {ImportType} type The type of the input that should be downloaded and imported.
 * @param {SentinelBand} sentinel_band The band of the sentinel2 scene that should be imported.
 * @param {LandsatActor} landsat_actor The atmospheric correction that should be applied to the landsat scene.
 * @param {String} vector_layer The name of the layer that should be imported from the vector file or postGIS database
 * @param {String} source The input source that may be a landsat scene name, a sentinel2 scene name, a postGIS database string,a stac collection ID or an URL that points to an accessible raster or vector file. A HTTP, HTTPS or FTP connection must be specified in case of raster or vector types. In this case the source string must contain the protocol that will used for connection: http:// or https:// or ftp://. PostGIS vector layer can be imported by defining a database string as source and a layer name.
 * @param {String} [semantic_label = undefined] Refers to the common names used tocall the bands of an image,for example: red, blue, nir, swirHowever, this property also accepts the band namesuch as B1, B8 etc. The semantic labeling should matchthe labels register in the stac collection.
 * @example red, blue, nir or B1, B2, B8A
 * @param {Extent} [extent = undefined] Spatio-temporal constraint defined by the userthroughout bbox and interval concept.
 * @param {String} [filter = undefined] Constrain in any other propertyor metadata.
 * @param {Resample} [resample = Resample.nearest] Resampling method to use for reprojection of raster map (default: nearest).
 * @param {Resolution} [resolution = Resolution.estimated] Resolution of output raster map. Estimated, user-specified or current region resolution (default: estimated).
 * @param {String} [resolution_value = undefined] Resolution of output raster map (use with option \"resolution\": \"value\") in units of the target coordinate reference system, not in map units. Must be convertable to float.
 * @param {String} [basic_auth = undefined] User name and password for basic HTTP, HTTPS and FTP authentication of the source connection. The user name and password must be separated by a colon: username:password
 */
export class ImportDescription {
    constructor(type, sentinel_band, landsat_actor, vector_layer, source, semantic_label, extent, filter=undefined, resample=Resample.nearest, resolution=Resolution.estimated, resolution_value=undefined, basic_auth=undefined) {
        this.type = type;
        this.sentinel_band = sentinel_band;
        this.landsat_actor = landsat_actor;
        this.vector_layer = vector_layer;
        this.source = source;
        this.semantic_label = semantic_label; 
        this.extent = extent;
        this.filter = filter;
        this.resample = resample;
        this.resolution = resolution; 
        this.resolution_value = resolution_value;
        this.basic_auth = basic_auth;
    }
}