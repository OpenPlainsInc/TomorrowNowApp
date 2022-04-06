/*
 * Filename: normalize.js
 * Project: TomorrowNow
 * File Created: Tuesday April 5th 2022
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


function normalize(kernel) {
    const len = kernel.length;
    const normal = new Array(len);
    let i,
      sum = 0;
    for (i = 0; i < len; ++i) {
      sum += kernel[i];
    }
    if (sum <= 0) {
      normal.normalized = false;
      sum = 1;
    } else {
      normal.normalized = true;
    }
    for (i = 0; i < len; ++i) {
      normal[i] = kernel[i] / sum;
    }
    return normal;
  }

export default normalize