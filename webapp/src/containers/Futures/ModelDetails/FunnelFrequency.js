/*
 * Filename: FunnelFrequency.js
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
import { FunnelChart, Funnel, LabelList, Tooltip } from 'recharts';


export const FunnelFrequency = () => {
    const data = [
        {
          "value": 100,
          "name": "Limit Impervious Surface",
          "fill": "#8884d8"
        },
        {
          "value": 80,
          "name": "Development Restrictions",
          "fill": "#83a6ed"
        },
        {
          "value": 50,
          "name": "Culverts",
          "fill": "#8dd1e1"
        },
        {
          "value": 40,
          "name": "Riperian Buffer",
          "fill": "#82ca9d"
        },
        {
          "value": 26,
          "name": "Public Engagment",
          "fill": "#a4de6c"
        }
      ]
      
    return (
        <FunnelChart width={730} height={500}>
            <Tooltip />
            <Funnel
                dataKey="value"
                data={data}
                isAnimationActive
            >
                <LabelList position="center" fill="#000" stroke="none" dataKey="name" />
            </Funnel>
        </FunnelChart>
    )
}