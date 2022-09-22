/*
 * Filename: countySelectStyle.js
 * Project: TomorrowNow
 * File Created: Thursday September 22nd 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Thu Sep 22 2022
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


import { Style, Fill, Stroke, Text, Circle as CircleStyle } from "ol/style";

export const countySelectionStyle = new Style({
    fill: new Fill({
      color: 'rgba(255, 255, 255, 0.7)',
    }),
    stroke: new Stroke({
      color: 'rgba(255, 255, 255, 0.7)',
      width: 6,
    }),
  });



export const countiesLabelStyle = new Style({
    text: new Text({
      font: '13px Calibri,sans-serif',
      fill: new Fill({
        color: '#000',
      }),
      stroke: new Stroke({
        color: '#fff',
        width: 4,
      }),
    }),
  });

export const countyStyle = (width=1) => {
    return new Style({
        stroke: new Stroke({
          color: 'rgba(94, 94, 94, 0.75)',
          width: width,
        }),
        fill: new Fill({
            color: 'rgba(20,20,20,0.0)',
        })
      })
  }

const countyStyles = [countyStyle(), countiesLabelStyle];

export const countiesStyleWithLabel = (feature) => {
    countiesLabelStyle
      .getText()
      .setText([
        // feature.getId(),
        // 'bold 13px Calibri,sans-serif',
        ` ${feature.get('name')}`,
        'bold 13px Calibri,sans-serif',
        '\n',
        '',
        // `${feature.get('density')} people/mi²`,
        // 'italic 11px Calibri,sans-serif',
      ]);
    return countyStyles
}

export const modelPointStyles = new Style({
  image: new CircleStyle({
      radius: 5,
      fill: new Fill({color: 'rgba(0, 0, 0, 0.9)'}),
      stroke: new Stroke({color: 'rgba(0, 0, 0, 1)', width: 1}),
      // fill: new Fill({color: 'rgba(208, 121, 68, 0.9)'}),
      // stroke: new Stroke({color: 'rgba(208, 121, 68, 1)', width: 1}),
      // fill: new Fill({color: 'rgba(101,126,150, 0.9)'}),
      // stroke: new Stroke({color: 'rgba(101,126,150, 1)', width: 1}),
  })
})

// export default countySelectionStyle