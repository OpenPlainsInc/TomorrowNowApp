/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/containers/Game/SurveyStatsCard.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Tuesday, September 20th 2022, 6:03:29 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */

import React from 'react';
import Card from 'react-bootstrap/Card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import surveyStyles from '../../components/OpenLayers/Features/surveyStyles';


export const SurveyStatsCard = (({surveyData}) => {

    return (
        <>
            <Card bg="bg-secondary-light" text="dark">
        
                <Card.Body>
                    <Card.Title>Survey Data</Card.Title>
                    <Card.Subtitle>Stormwater Problem Severity</Card.Subtitle>
                </Card.Body>
                
                <div style={{backgroundColor: "white"}}>

                    <BarChart 
                        width={500}
                        height={400}
                        data={surveyData}
                        margin={{
                            top: 10,
                            right: 10,
                            left: 10,
                            bottom: 10,
                        }}>
                        <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="unserious" fill={surveyStyles.colorScheme[0]} />
                            <Bar dataKey="somewhat_unserious" fill={surveyStyles.colorScheme[1]} />
                            <Bar dataKey="neutral" fill={surveyStyles.colorScheme[2]} />
                            <Bar dataKey="somewhat_serious" fill={surveyStyles.colorScheme[3]} />
                            <Bar dataKey="serious" fill={surveyStyles.colorScheme[4]} />
                    </BarChart>
                </div>
                <Card.Footer>
                    <Card.Text>Data Collected during RCN Workshop...</Card.Text>
                </Card.Footer>
            </Card>
        </>
    )
})