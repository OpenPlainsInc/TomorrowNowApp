/*
 * Filename: grass.js
 * Project: TomorrowNow
 * File Created: Monday April 4th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Tue Apr 05 2022
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

const aspect =  [
    'interpolate',
    ['linear'],
    ['band', 1],
    0, 'white',
    1, 'yellow',
    90, 'green',
    180, 'cyan',
    270, 'red',
    360, 'yellow'
]

const aspectBW = [
    'interpolate',
    ['linear'],
    ['band', 1],
    0, 'black',
    180, 'white',
    360, 'black'
]

const slope =  [
        'interpolate',
        ['linear'],
        ['band', 1],
        0,  [255,255,255],
        2,  [255,255,0],
        5,  [0,255,0],
        10, [0,255,255],
        15, [0,0,255],
        30, [255,0,255],
        50, [255,0,0],
        90, [0,0,0]
    ]

const terrain = [
    'interpolate',
    ['linear'],
    ['band', 1],
    -11000, [0, 0, 0],
    -500,   [0, 0, 30],
    -100,   [0, 0, 200],
    -1,     [150, 150, 255],
    0,      [0, 120, 0],
    100,    [0, 150, 0],
    270,    [90, 165, 90],
    300,    [90 ,175, 90],
    500,    [50, 180, 50],
    500,    [70, 170, 70],
    1000,   [70 ,145, 75],
    1000,   [70, 155, 75],
    2000,   [150, 156, 100],
    2800,   [220, 220, 220],
    3000,   [255, 255, 255],
    8850,   [255, 255, 255]
]
export default {
    aspect,
    aspectBW,
    slope,
    terrain
}
