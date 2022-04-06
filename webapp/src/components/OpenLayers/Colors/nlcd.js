/*
 * Filename: nlcd.js
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

const nlcd =  [
    'case',
    ['==', ['band', 1], 1], 
    "#00fa00", 
    ['==', ['band', 1], 11],
    "#476ba1",
    ['==', ['band', 12], 12],
    "#d1defa",
    ['==', ['band', 21], 21],
    "#decaca",
    ['==', ['band', 22], 22],
    "#d99482",
    ['==', ['band', 23], 23],
    "#ee0000",
    ['==', ['band', 24], 24],
    "#ab0000",
    ['==', ['band', 31], 31],
    "#b3aea3",
    ['==', ['band', 32], 32],
    "#fafafa",
    ['==', ['band', 41], 41],
    "#68ab63",
    ['==', ['band', 42], 42],
    "#1c6330",
    ['==', ['band', 43], 43],
    "#b5ca8f",
    ['==', ['band', 51], 51],
    "#a68c30",
    ['==', ['band', 52], 52],
    "#ccba7d",
    ['==', ['band', 71], 71],
    "#e3e3c2",
    ['==', ['band', 72], 72],
    "#caca78",
    ['==', ['band', 73], 73],
    "#99c247",
    ['==', ['band', 74], 74],
    "#78ae94",
    ['==', ['band', 81], 81],
    "#dcd93d",
    ['==', ['band', 82], 82],
    "#ab7028",
    ['==', ['band', 90], 90],
    "#bad9eb",
    ['==', ['band', 91], 91],
    "#b5d4e6",
    ['==', ['band', 92], 92],
    "#b5d4e6",
    ['==', ['band', 93], 93],
    "#b5d4e6",
    ['==', ['band', 94], 94],
    "#b5d4e6",
    ['==', ['band', 95], 95],
    "#70a3ba",
    '#fff'
]

export default nlcd