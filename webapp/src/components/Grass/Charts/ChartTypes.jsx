/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/Grass/Charts/ChartTypes.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Wednesday, May 11th 2022, 1:22:57 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */

import React from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, AreaChart, Area } from 'recharts';

const _ChartTypes = {
    'BAR': 'Bar',
    'LINE': 'Line',
    'AREA': 'Area'
}


export const ChartTypes = {..._ChartTypes}



export const GrassBarChart = ({data, colorMap, width = 500, height = 300, tooltip = true, legend = false}) => {
  

    return (
        <BarChart
            width={width}
            height={height}
            data={data}
            margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
            }}
            barSize={5}
        > 
        <XAxis dataKey="year" scale="point" padding={{ left: 10, right: 10 }}  />
        <YAxis  />
        { tooltip ? <Tooltip /> : null }
        { legend ? <Legend /> : null }
        <CartesianGrid strokeDasharray="3 3" />
        {
            colorMap.filter(y=>y.year ==='2016').map((d, idx) => (
              <Bar key={`cell-${d.label}-${d.year}`} fill={d.color} dataKey={`${d.label}`}/>
           ))
        }
      </BarChart>
    )
}


export const GrassLineChart = ({data, colorMap, width = 500, height = 300 , tooltip = true, legend = false}) => {
  
    return (
        <LineChart
            width={width}
            height={height}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
         >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          tickCount={8}
          dataKey="year"
          type="number" 
          domain={[2001, 2019]}
          allowDuplicatedCategory={false} 
        />
        <YAxis />
        { tooltip ? <Tooltip /> : null }
        { legend ? <Legend /> : null } {/* <Legend /> */}
        {
           colorMap.filter(y=>y.year ==='2016').map((d, idx) => (
            <Line key={`cell-${d.label}`} type="monotone" stroke={d.color} dataKey={`${d.label}`}/>
        ))
        }
    
      </LineChart>
    )
}


export const GrassAreaChart = ({data, colorMap, width = 500, height = 300, tooltip = true, legend = false}) => {


    return (
        <AreaChart
            width={width}
            height={height}
            data={data}
            margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
            }}
        >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
            tickCount={8}
            dataKey="year" 
            type="number" 
            domain={[2001, 2019]}
            allowDuplicatedCategory={false}
        />
        <YAxis />
        { tooltip ? <Tooltip /> : null }
        { legend ? <Legend /> : null }
        {
            colorMap.filter(y=>y.year ==='2016').map((d, idx) => (
                <Area key={`cell-${d.label}`} type="monotone" dataKey={`${d.label}`} stackId="1" fill={d.color} stroke={d.color} />
            ))
        }
                        
        </AreaChart>

    )
}


export const Charts = ({chartType, data, colorMap}) => {
    return (
        <>
            {chartType === _ChartTypes.BAR ? <GrassBarChart data={data} colorMap={colorMap} /> : null}
            {chartType === _ChartTypes.LINE ? <GrassLineChart data={data} colorMap={colorMap}/> : null}
            {chartType === _ChartTypes.AREA ? <GrassAreaChart data={data} colorMap={colorMap}/> : null}
        </>
    )
}