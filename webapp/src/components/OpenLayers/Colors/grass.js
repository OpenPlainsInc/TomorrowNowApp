/*
 * Filename: grass.js
 * Project: TomorrowNow
 * File Created: Monday April 4th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Thu Apr 28 2022
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

//GRASS Color Maps
//https://svn.osgeo.org/grass/grass/branches/releasebranch_6_4/lib/gis/colors/

import Grass from "../../Grass/grass"

const fetchScheme = (locationName, mapsetName, rasterName) => {
    return Grass.r.colors(locationName, mapsetName, rasterName)
}

const parseResults = (data) => {
    let scheme = [
        'interpolate',
        ['linear'],
        ['band', 1],
    ]

    data.map(d=> {
        let tmp = d.split(" ")
        let value = parseFloat(tmp[0])
        let color = tmp[1].split(":").map(i => parseInt(i))
        scheme.push(value, color)
    })
   
    let noData = [-9999, [0,0,0,0]]

    return scheme.slice(0, -4)
}

export default {
    fetchScheme,
    parseResults
}
