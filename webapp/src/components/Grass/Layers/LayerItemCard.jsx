/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/Grass/Layers/LayerItemCard.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Friday, May 13th 2022, 12:04:17 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */
import Card from 'react-bootstrap/Card'
import { LinkContainer } from 'react-router-bootstrap'
import { GrassRenderImage } from '../Utils'

export const LayerItemCard = ({title, datatype, locationName, mapsetName}) => {

    return (
        
        <Card  key={title} >
            <GrassRenderImage layerType={datatype} layerName={title} locationName={locationName} mapsetName={mapsetName}></GrassRenderImage>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text></Card.Text>
                <LinkContainer to={`/board/location/${locationName}/mapset/${mapsetName}/raster/${title}/map`}> 
                    <Card.Link >Map</Card.Link>
                </LinkContainer>
                <LinkContainer to={`/board/location/${locationName}/mapset/${mapsetName}/raster/${title}`}> 
                    <Card.Link >Metadata</Card.Link>
                </LinkContainer>             
            </Card.Body>
        </Card>
    )
}