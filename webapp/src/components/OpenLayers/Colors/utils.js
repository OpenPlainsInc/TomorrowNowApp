/*
 * Filename: utils.js
 * Project: TomorrowNow
 * File Created: Monday April 4th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Tue Sep 20 2022
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
//https://github.com/bpostlethwaite/colormap
import colormap from 'colormap';
import colorbrewer from './colorbrewer';
import grass from './grass';
import nlcd from './nlcd';

const defautColormaps = [
    'jet', 'hsv','hot','cool','spring','summer','autumn','winter','bone',
    'copper','greys','YIGnBu','greens','YIOrRd','bluered','RdBu','picnic',
    'rainbow','portland','blackbody','earth','electric',

    'viridis', 'inferno', 'magma', 'plasma', 'warm', 'cool', 'rainbow-soft',

    'bathymetry', 'cdom', 'chlorophyll', 'density', 'freesurface-blue', 'freesurface-red', 'oxygen', 'par', 'phase', 'salinity', 'temperature', 'turbidity', 'velocity-blue', 'velocity-green',

    'cubehelix'
]

const elevationRGB = [
    '+',
    -10000,
    [
      '*',
      0.1 * 255,
      [
        '+',
        ['*', 256 * 256, ['band', 1]],
        ['+', ['*', 256, ['band', 2]], ['band', 3]],
      ],
    ],
  ];

//https://openlayers.org/workshop/en/cog/colormap.html
const getColorStops = (name, min, max, steps, reverse) => {
    if (name === 'cubehelix' && steps < 16 ) {
        steps = 16
        console.warn("Steps set to 16 to meet Cubehelix minimume step requriements")
    }
    const delta = (max - min) / (steps - 1);
    const stops = new Array(steps * 2);
    const colors = colormap({colormap: name, nshades: steps, format: 'rgba'});
    if (reverse) {
      colors.reverse();
    }
    for (let i = 0; i < steps; i++) {
      stops[i * 2] = min + i * delta;
      stops[i * 2 + 1] = colors[i];
    }
    return stops;
  }

  const autoDetectPalette = (map, dataMin=0, dataMax=100, step=10) => {
      console.log("autoDetectPalette", map)
      if (map === 'aspect') return grass.aspect;
      if (map === 'slope') return grass.slope;
      if (map === 'nlcd') return nlcd;
      if (map.includes("nlcd")) return nlcd.webGLColors;

      // if (map === 'grass') return (grass)

      // if (map === 'point_basin') {
      //   return [
      //     'case',
      //     ['==', ['band', 1], 1], 
      //     "#00fa00", 
      //     ['==', ['band', 2], 2],
      //     "#476ba1",
      //     ['==', ['band', 3], 3],
      //     "#d1defa",
      //     ['==', ['band', 4], 4],
      //     "#decaca",
      //     '#fff'
      //   ]
      // }


      if (map === 'elev_ned_30m') {
          return [
            'case',
            // use the `level` style variable to determine the color
            ['<=', elevationRGB, ['var', 'level']],
            [139, 212, 255, 1],
            [139, 212, 255, 0],
          ]
      }
      if (map ===  'elevation' || map === 'elev_ned_30m') {
        return [
                'interpolate',
                ['linear'],
                ['band', 1],
                ...getColorStops('earth', 55.57, 157.0, 10, false)
            ]
      }
      if (map ===  'elev_lid792_1m') {
        return [
                'interpolate',
                ['linear'],
                ['band', 1],
                ...getColorStops('earth', 103.0, 132.0, 10, false)
            ]
      }
      if (map ===  'el_D783_6m') {
        return [
                'interpolate',
                ['linear'],
                ['band', 1],
                ...getColorStops('earth', 87, 147.0, 10, false)
            ]
      }
      if (map ===  'elev_srtm_30m') {
        return [
                'interpolate',
                ['linear'],
                ['band', 1],
                ...getColorStops('earth', -31.0, 190.0, 10, false)
            ]
      }
      if (map === 'landclass96') {
        return [
            'interpolate',
            ['linear'],
            ['band', 1],
            ...getColorStops('YIGnBu', 0, 9, 9, false)
        ]
      }
      if (map === 'el_D782_6m') {
        return [
            'interpolate',
            ['linear'],
            ['band', 1],
            ...getColorStops('earth', 98.0, 147.0, 10, false)
        ]
      }
      return [
        'interpolate',
        ['linear'],
        ['band', 1],
        ...getColorStops('earth', dataMin, dataMax, step, false)
    ]

  } 

  const utils = {
    autoDetectPalette,
    colorbrewer,
    defautColormaps,
    getColorStops
  }



  export default utils

  