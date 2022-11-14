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


import { Circle as CircleStyle, Fill, Stroke, Style, Text } from "ol/style";
import { set } from "ol/transform";

import FillPattern from "ol-ext/style/FillPattern";



export const protectAreaStyle = (value, idx) => {
    const style = new Style({
        stroke: new Stroke({
          color: 'rgba(0,0,0, 1.0)',
          width: 4,
        }),
        fill: new FillPattern({
          pattern: "hatch",
          spacing: 10,
          size: 3,
          color: 'rgba(208,121,68, 1.0)',
        }),
        text: new Text({
          font: '16px sans-serif',
          text: `ID: ${idx}`,
          fill: new Fill({
            color: 'rgba(0, 0, 0, 1.0)',
          }),
          stroke: new Stroke({
            color: 'rgba(255, 255, 255, 1.0)',
            width: 1,
          }),
        })
      });

      // const glowstyle = new Style({
      //   stroke: new Stroke({
      //     color: 'RGB(200, 200, 200, 0.95)',
      //     width: 3,
      //   })
      // });
      

    // https://colorbrewer2.org/?type=diverging&scheme=BrBG&n=5
    let colorScheme = {
        "0.99":'rgb(166,97,26, 0.85)',
        "0.5":'rgb(223,194,125, 0.85)',
        "0.0": 'rgb(245,245,245, 0.85)',
        "-0.5": 'rgb(128,205,193, 0.85)',
        "-0.99" : 'rgb(1,133,113, 0.85)',
        "black": 'rgb(0,0,0)'
    }

    if (colorScheme[value]) {
        style.setFill(new FillPattern({
          pattern: "hatch",
          spacing: 10,
          size: 3,
          color: colorScheme["black"],
        }))

    }
    console.log("style", style)
    return [style]
    
}
