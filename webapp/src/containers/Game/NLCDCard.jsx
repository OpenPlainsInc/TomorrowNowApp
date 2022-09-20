/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/containers/Game/NLCDCard.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Tuesday, September 20th 2022, 5:53:19 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */
import React from 'react';
import Card from 'react-bootstrap/Card'
import { ChartsContainer } from '../../components/Grass/Charts/ChartsContainer';
import { Charts, ChartTypes} from '../../components/Grass/Charts/ChartTypes';
import { chartDataFormat } from '../../components/Grass/Charts/chartDataFormat';

export const NLCDCard = (({nlcdData, basinElevationInfo}) => {

    const nlcdTotalArea = (data) => {
        const areaList = data.filter(c=> c.catDetails).map(c=>c.area).reduce((a,b) => parseFloat(a) + parseFloat(b))
        return areaList.toFixed(2)
    }

    return (
        nlcdData ? 
            <>
                <Card bg="bg-secondary-light" text="dark">
                    <Card.Body>
                        <Card.Title>Upstream Land Use Characteristics</Card.Title>
                        <Card.Subtitle key="elev-total-area"><strong>Total Area: </strong> {nlcdTotalArea(nlcdData)} km<sup>2</sup></Card.Subtitle>
                        <Card.Subtitle key={`melev`}><strong>Mean Elevation: </strong> {parseFloat(basinElevationInfo.map(e=>e.mean)).toFixed(2)}m <span>&#177;</span> {parseFloat(basinElevationInfo.map(e=>e.stddev)).toFixed(2)}</Card.Subtitle>
                        <Card.Subtitle  key={`relev}`}><strong>Min - Max Elevation: </strong>{parseFloat(basinElevationInfo.map(e=> e.min)).toFixed(2)}m - {parseFloat(basinElevationInfo.map(e=>e.max)).toFixed(2)}m</Card.Subtitle>
                    </Card.Body>
                    <div style={{backgroundColor: "white"}}>
                        <ChartsContainer 
                        options={[ChartTypes.BAR, ChartTypes.LINE, ChartTypes.AREA]}
                        data={chartDataFormat(nlcdData)} 
                        colorMap={nlcdData}>
                        <Charts/>
                        </ChartsContainer>
                    </div>
                    <Card.Footer>
                        <Card.Text>USGS NLCD</Card.Text>
                    </Card.Footer>
                </Card>
            </>
        :  null
    )
})