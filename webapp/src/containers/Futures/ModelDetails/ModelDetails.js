/*
 * Filename: ModelDetails.js
 * Project: TomorrowNow
 * File Created: Wednesday October 19th 2022
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

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ModelDetailsContainer from './ModelDetailsContainer'
import { useState, useEffect } from 'react'
import { ModelAnalyticCard } from './ModelAnalyticCard'
import { SnakeyScenario } from './SnakeyScenario'
import { ModelGraphCard } from './ModelGraphCard'
import { FrequecyBarChart } from './FrequecyBarChart'

export const ModelDetails = ({model, errors, isloading}) => {
    console.log("ModelDetails", model, errors, isloading)
    const [data, setData] = useState(model)
    useEffect(()=> {
        if (!model) return
        setData(model)
    }, [model])


    const currencyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    })

    return (
        <>
            <Row>
                <Col md={9}>
                    <h1>{data?.name}</h1>
                </Col>
            </Row>

            {/* Header Analytics */}
            <Row>
                <Col md={3}>
                    <ModelAnalyticCard 
                        label={"Active Users"} 
                        value={65} 
                        icon={"fa-user"}
                        tooltip={"The number of unqiue active users over the past month."}
                    />
                </Col>
                <Col md={3}>
                    <ModelAnalyticCard 
                        label={"Scenarios"} 
                        value={203} 
                        icon={"fa-map-location"}
                        tooltip={"The total number of urban development scenarios ran for the model."}
                    />
                </Col>
                <Col md={3}>
                    <ModelAnalyticCard 
                        label={"Avg. Cost Per Intervention"} 
                        value={currencyFormatter.format(523468.21)} 
                        icon={"fa-money-bill-wave"}
                        tooltip={"The median estimated cost of user's intervention stratagies."}
                    />
                </Col>
                <Col md={3}>
                    <ModelAnalyticCard 
                        label={"Projected Developed"} 
                        value={"+ 125%"} 
                        icon={"fa-city"}
                        tooltip={"The mean percent increase in develop based off of all development scenarios."}
                    />
                </Col>
            </Row>

            {/* Charts/Graphs/Maps */}
            <Row>
                <Col md={6}>
                    <ModelGraphCard 
                        label={"Outcomes"} 
                        tooltip={"The chart represents the impact of different intervention stratagies occuring at different timesteps."}
                    >
                        <SnakeyScenario/>
                    </ModelGraphCard>
                </Col>
                <Col md={6}>
                    <ModelGraphCard 
                        label={"Most Frequent Intervention"} 
                        tooltip={"The most frequently used intervention stratagies."}
                    >
                        <FrequecyBarChart/>
                    </ModelGraphCard>
                </Col>
            </Row>
        </>
    )
}