/*
 * Filename: kernels.js
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


const kernels = {
    none: [0, 0, 0, 0, 1, 0, 0, 0, 0],
    sharpen: [0, -1, 0, -1, 5, -1, 0, -1, 0],
    sharpenless: [0, -1, 0, -1, 10, -1, 0, -1, 0],
    blur: [1, 1, 1, 1, 1, 1, 1, 1, 1],
    gaussianBlur: [
      0.045, 0.122, 0.045,
      0.122, 0.332, 0.122,
      0.045, 0.122, 0.045
    ],
    gaussianBlur2: [
      1, 2, 1,
      2, 4, 2,
      1, 2, 1
    ],
    gaussianBlur3: [
      0, 1, 0,
      1, 1, 1,
      0, 1, 0
    ],
    unsharpen: [
      -1, -1, -1,
      -1,  9, -1,
      -1, -1, -1
    ],
    shadow: [1, 2, 1, 0, 1, 0, -1, -2, -1],
    emboss: [-2, 1, 0, -1, 1, 1, 0, 1, 2],
    edge: [0, 1, 0, 1, -4, 1, 0, 1, 0],
  };

  export default kernels

 

  
    //     sharpness: [
    //        0,-1, 0,
    //       -1, 5,-1,
    //        0,-1, 0
    //     ],
    //     sharpen: [
    //        -1, -1, -1,
    //        -1, 16, -1,
    //        -1, -1, -1
    //     ],
    //     edgeDetect: [
    //        -0.125, -0.125, -0.125,
    //        -0.125,  1,     -0.125,
    //        -0.125, -0.125, -0.125
    //     ],
    //     edgeDetect2: [
    //        -1, -1, -1,
    //        -1,  8, -1,
    //        -1, -1, -1
    //     ],
    //     edgeDetect3: [
    //        -5, 0, 0,
    //         0, 0, 0,
    //         0, 0, 5
    //     ],
    //     edgeDetect4: [
    //        -1, -1, -1,
    //         0,  0,  0,
    //         1,  1,  1
    //     ],
    //     edgeDetect5: [
    //        -1, -1, -1,
    //         2,  2,  2,
    //        -1, -1, -1
    //     ],
    //     edgeDetect6: [
    //        -5, -5, -5,
    //        -5, 39, -5,
    //        -5, -5, -5
    //     ],
    //     sobelHorizontal: [
    //         1,  2,  1,
    //         0,  0,  0,
    //        -1, -2, -1
    //     ],
    //     sobelVertical: [
    //         1,  0, -1,
    //         2,  0, -2,
    //         1,  0, -1
    //     ],
    //     previtHorizontal: [
    //         1,  1,  1,
    //         0,  0,  0,
    //        -1, -1, -1
    //     ],
    //     previtVertical: [
    //         1,  0, -1,
    //         1,  0, -1,
    //         1,  0, -1
    //     ],
    //     boxBlur: [
    //         0.111, 0.111, 0.111,
    //         0.111, 0.111, 0.111,
    //         0.111, 0.111, 0.111
    //     ],
    //     triangleBlur: [
    //         0.0625, 0.125, 0.0625,
    //         0.125,  0.25,  0.125,
    //         0.0625, 0.125, 0.0625
    //     ],
    //     emboss: [
    //        -2, -1,  0,
    //        -1,  1,  1,
    //         0,  1,  2
    //     ]