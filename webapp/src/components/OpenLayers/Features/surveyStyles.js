/*
 * Filename: surveyStyles.js
 * Project: TomorrowNow
 * File Created: Wednesday April 6th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Thu May 26 2022
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
import colorbrewer from "../Colors/colorbrewer";

// The defined color scheme
const colorScheme = colorbrewer.asRGBA('RdBu', 5).reverse()

/**
 * Base style for survey point data.
 * @param {String} fillColor 
 * @returns {Style} Return a openlayers style object with distict fill color.
 */
const baseStye = fillColor => {
  return new Style({
    image: new CircleStyle({
      radius: 5,
      fill: new Fill({
        color: fillColor,
      }),
      stroke: new Stroke({
        color: 'black',
        width: 0.5,
      }),
    })
  })
}

/**
 * Defined style mapping from survey data to color scheme
 */
const styleCache = {
  'unserious': baseStye(colorScheme[0]),
  'somewhat_unserious': baseStye(colorScheme[1]),
  'neutral': baseStye(colorScheme[2]),
  'somewhat_serious': baseStye(colorScheme[3]),
  'serious':baseStye(colorScheme[4]),
  'selected': baseStye('yellow'),
};

/**
 * Helper function that sets feature color based on features properties data.
 * @param {ol/Feature} feature - Openlayers Feature 
 * @returns {ol/Style} 
 */
const setSurveyStyle = (feature) => {
  const classify = feature.get("how_serious_is_this_problem");
  return styleCache[classify];
}

const surveyStyles = {
  colorScheme,
  styleCache,
  setSurveyStyle
}

export default surveyStyles;