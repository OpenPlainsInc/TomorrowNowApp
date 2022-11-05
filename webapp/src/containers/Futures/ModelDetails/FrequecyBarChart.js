/*
 * Filename: FrequecyBarChart.js
 * Project: TomorrowNow
 * File Created: Saturday November 5th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Sat Nov 05 2022
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


import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export const FrequecyBarChart = () => {
    const data = [
        {
          "count": 100,
          "name": "Limit Impervious Surface",
          "fill": "#8884d8"
        },
        {
          "count": 80,
          "name": "Restrict Development",
          "fill": "#83a6ed"
        },
        {
          "count": 50,
          "name": "Add Culverts",
          "fill": "#8dd1e1"
        },
        {
          "count": 40,
          "name": "Modify Riperian Buffer",
          "fill": "#82ca9d"
        },
        {
          "count": 26,
          "name": "Public Engagment",
          "fill": "#a4de6c"
        }
      ]
      
    return (
        // <ResponsiveContainer width="100%" height="300px">
        <BarChart
          width={900}
          height={300}
          data={data}
          layout="vertical"
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis dataKey="name" angle={0} width={200} type="category"/>
          <XAxis type="number" reversed={false}/>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
          <Bar dataKey="count" stackId="name" fill="fill" />
        </BarChart>
    //   </ResponsiveContainer>
    )
}