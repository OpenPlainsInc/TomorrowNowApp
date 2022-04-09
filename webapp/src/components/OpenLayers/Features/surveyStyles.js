/*
 * Filename: surveyStyles.js
 * Project: TomorrowNow
 * File Created: Wednesday April 6th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Thu Apr 07 2022
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
'use strict';
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import colorbrewer from "../Colors/colorbrewer";
// const colorScheme = colorbrewer.asRGBA('RdYlBu', 5)
const colorScheme = colorbrewer.asRGBA('RdBu', 5)



const styleCache = {
    'unserious': new Style({
        image: new CircleStyle({
            radius: 5,
            fill: new Fill({
                color: colorScheme[0],
              }),
            stroke: new Stroke({
              color: 'black',
              width: 0.5,
            }),
          }),
    }),
    "somewhat_unserious": new Style({
        image: new CircleStyle({
            radius: 5,
            fill: new Fill({
                color: colorScheme[1],
              }),
            stroke: new Stroke({
              color: 'black',
              width: 0.5,
            }),
          }),
    }),
    'neutral': new Style({
       image: new CircleStyle({
        radius: 5,
        fill: new Fill({
            color: colorScheme[2],
          }),
        stroke: new Stroke({
          color: 'black',
          width: 0.5,
        }),
      }),
    }),
    'somewhat_serious': new Style({
        image: new CircleStyle({
            radius: 5,
            fill: new Fill({
                color: colorScheme[3],
              }),
            stroke: new Stroke({
              color: 'black',
              width: 0.5,
            }),
          }),
    }),
    'serious': new Style({
        image: new CircleStyle({
            radius: 5,
            fill: new Fill({
                color: colorScheme[4],
              }),
            stroke: new Stroke({
              color: 'black',
              width: 0.5,
            }),
          }),
    }),
    'selected': new Style({
        image: new CircleStyle({
            radius: 5,
            fill: new Fill({
                color: 'yellow',
              }),
            stroke: new Stroke({
              color: 'black',
              width: 0.5,
            }),
          }),
    })
  };

  const setSurveyStyle = (feature) => {
    const classify = feature.get("how_serious_is_this_problem");
    // console.log("setSurvey: ",feature, classify, styleCache[classify])
    return styleCache[classify];
  }


export default {
    styleCache,
    setSurveyStyle,
    colorScheme
}