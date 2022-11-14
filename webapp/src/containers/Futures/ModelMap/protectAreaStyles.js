/*
 * Filename: protectAreaStyles.js
 * Project: TomorrowNow
 * File Created: Sunday November 13th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Sun Nov 13 2022
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


import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";




export const protectAreaStyle = (value) => {
    const style = new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.85)',
        }),
        stroke: new Stroke({
          color: '#000',
          width: 2,
        })
      });

      const glowstyle = new Style({
        stroke: new Stroke({
          color: 'RGB(200, 200, 200, 0.5)',
          width: 3,
        })
      });
      

    // https://colorbrewer2.org/?type=diverging&scheme=BrBG&n=5
    let colorScheme = {
        "0.99":'rgb(166,97,26, 0.85)',
        "0.5":'rgb(223,194,125, 0.85)',
        "0.0": 'rgb(245,245,245, 0.85)',
        "-0.5": 'rgb(128,205,193, 0.85)',
        "-0.99" : 'rgb(1,133,113, 0.85)'
    }

    if (colorScheme[value]) {
        style.setFill(new Fill({
            color: colorScheme[value],
          }))
    }
    console.log("style", style)
    return [style, glowstyle]
    
}
