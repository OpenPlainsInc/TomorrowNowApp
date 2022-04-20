/*
 * Filename: grass.js
 * Project: TomorrowNow
 * File Created: Tuesday April 12th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Wed Apr 20 2022
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

const API_HOST = "http://localhost:8005/savana"


const Grass = {
    locations : {
        getLocations: (async () => {
            /**
            * Route: /locations/{location_name}/info
            */
              try {
                // let queryParams = {un: params.unId}
                const url = new URL(`${API_HOST}/g/locations`)
                let res = await fetch(url, { 
                    headers: {
                    'Content-Type': 'application/json'
                    }
                });
                // let data = await res.json();
                // console.log("response:", data)
                return await res.json()                         
            } catch (e) {
                console.log(e);
            }
        }),
        getLocation: (async (locationName) => {
            /**
            * Route: /locations/{location_name}/info
            */
              try {
                // let queryParams = {un: params.unId}
                const url = new URL(`${API_HOST}/g/locations/${locationName}/info`)
                let res = await fetch(url, { 
                    headers: {
                    'Content-Type': 'application/json'
                    }
                });
                let data = await res.json();
                console.log("response:", data)
                return data                         
            } catch (e) {
                console.log(e);
            }
        }),
        location: {
            mapsets: {
                getMapsets: (async (locationName) => {
                    /**
                    * Route: /locations/{location_name}/mapsets
                    */
                    try {
                        // let queryParams = {un: params.unId}
                        const url = new URL(`${API_HOST}/g/locations/${locationName}/mapsets`)
                        let res = await fetch(url, { 
                            headers: {
                            'Content-Type': 'application/json'
                            }
                        });
                       
                        return await res.json();                         
                    } catch (e) {
                        console.log(e);
                    }
                }),
                getMapset: (async (locationName, mapsetName) => {
                    /**
                     * Route: /locations/{location_name}/mapsets
                    */
                    try {
                        const url = new URL(`${API_HOST}/g/locations/${locationName}/mapsets/${mapsetName}/info`)
                        let res = await fetch(url, { 
                            headers: {
                            'Content-Type': 'application/json'
                            }
                        });
                        let data = await res.json();
                        console.log("response:", data)
                        return data                    
                      } catch (e) {
                        console.log(e);
                    }
                }),
                getRasterLayers: (async (locationName, mapsetName) => {
                    /**
                     * Route: /locations/{location_name}/mapsets
                    */
                    try {
                        // let queryParams = {un: params.unId}
                        const url = new URL(`${API_HOST}/g/locations/${locationName}/mapsets/${mapsetName}/raster_layers`)
                        // url.search = new URLSearchParams(queryParams).toString();
                        let res = await fetch(url, { 
                            headers: {
                            'Content-Type': 'application/json'
                            }
                        });
                        let data = await res.json();
                        console.log("response:", data)
                        return data                    
                      } catch (e) {
                        console.log(e);
                    }
                })
            }
        }
    },
    d: {
        renderRaster: (async (locationName, mapsetName, rasterName)=> {
            try {
                let url = new URL(`${API_HOST}/r/locations/${locationName}/mapsets/${mapsetName}/raster_layers/${rasterName}/render`)
                const res = await fetch(url);
                return await res.json();
            } catch (e) {
                console.log(e);
            }
        }),
        renderGeoTiff: (async (locationName, mapsetName, rasterName)=> {
            try {
                let url = new URL(`${API_HOST}/r/locations/${locationName}/mapsets/${mapsetName}/raster_layers/${rasterName}/geotiff_async_orig`)
                const res = await fetch(url);
                return await res.json();
            } catch (e) {
                console.log(e);
            }
        })
    },
    g: {},
    r: {
        info: (async (locationName, mapsetName, rasterName)=> {
            try {
                let url = new URL(`${API_HOST}/r/locations/${locationName}/mapsets/${mapsetName}/raster_layers/${rasterName}`)
                const res = await fetch(url);
                return await res.json();
            } catch (e) {
                console.log(e);
            }
        }),
        colors: (async (locationName, mapsetName, rasterName)=> {
            try {
                let url = new URL(`${API_HOST}/r/locations/${locationName}/mapsets/${mapsetName}/raster_layers/${rasterName}/colors`)
                const res = await fetch(url);
                return await res.json();
            } catch (e) {
                console.log(e);
            }
        })

    },
    r3: {},
    v: {}
}


export default Grass