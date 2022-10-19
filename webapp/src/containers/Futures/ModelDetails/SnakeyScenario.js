/*
 * Filename: SnakeyScenario.js
 * Project: TomorrowNow
 * File Created: Wednesday October 19th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Wed Oct 19 2022
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

import React from 'react';
import { Sankey, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { Rectangle, Layer } from "recharts";

export default function DemoSankeyNode({
  x,
  y,
  width,
  height,
  index,
  payload,
  containerWidth,
  colors
}) {
  const isOut = x + width + 6 > containerWidth;
  return (
    <Layer key={`CustomNode${index}`}>
      <Rectangle
        x={x}
        y={y}
        width={width}
        height={height}
        fill={colors[index % colors.length]}
        fillOpacity="1"
      />
      <text
        textAnchor={isOut ? "end" : "start"}
        x={isOut ? x - 6 : x + width + 6}
        y={y + height / 2}
        fontSize="14"
        stroke="#333"
      >
        {payload.name}
      </text>
      <text
        textAnchor={isOut ? "end" : "start"}
        x={isOut ? x - 6 : x + width + 6}
        y={y + height / 2 + 13}
        fontSize="12"
        stroke="#333"
        strokeOpacity="0.5"
      >
        {payload.value + "km2"}
      </text>
    </Layer>
  );
}

export const SnakeyScenario = () => {
    const colors = ['#7ac74fff', '#a1cf6bff', '#d5d887ff', '#e0c879ff', '#e87461ff']
    const data0 = {
        nodes: [
            { name: '2022' }, //0
            { name: '2028 (No Interventions)' }, //1
            { name: '2025' }, //2
            { name: '2028-b' }, //3
            { name: '2028-a' }, //4
            { name: '2031' }, //5
            
        ],
        links: [
            { source: 0, target: 1, value: 3728.3 },
            { source: 0, target: 2, value: 354170 },
            { source: 2, target: 3, value: 62429 },
            { source: 2, target: 4, value: 291741 },
            { source: 2, target: 4, value: 291741 },
            { source: 3, target: 5, value: 50000 },
        ]
    }
    return (
        <Sankey
            width={960}
            height={500}
            data={data0}
            node={<DemoSankeyNode containerWidth={960} colors={colors}/>}
            // node={{"stroke": "#77c878", "strokeWidth": "2"}}
            nodePadding={50}
            margin={{
            left: 200,
                right: 200,
                top: 100,
                bottom: 100,
            }}
            link={{ stroke: '#77c878' }}
            >
            <Tooltip />
        </Sankey>
    )
}
