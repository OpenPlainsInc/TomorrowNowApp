/*
 * Filename: DataWelcomeCard.js
 * Project: TomorrowNow
 * File Created: Wednesday September 21st 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Wed Feb 22 2023
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

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';
import GrassRenderImage from "../../components/Grass/Utils/GrassRenderImage";

const DataWelcomeCard = () => {
    const LOCATION = "futures_triangle_nc"
    const MAPSET = "PERMANENT" //"futures_test"
    const RASTER =  "elevation" //"suitability"
    const DATATYPE = "raster"
   
    return (
        <Card>
            <Card.Header as="h2">Explore Data</Card.Header>
            {/* <GrassRenderImage style={{ height: '18rem' }}
                card={true} 
                layerType={DATATYPE}
                layerName={RASTER}
                locationName={LOCATION}
                mapsetName={MAPSET}/> */}
            
            <Card.Body>
                
                
                <Card.Img style={{ height: '25rem', marginTop: '-4rem'}} src="./futures_tilt.png"></Card.Img>
                
                
            </Card.Body>
            <Card.Footer>
                {/* <Card.Title>Explore Data</Card.Title> */}
                 <Card.Text>
                    Learn about the data used in the FUTURES model.
                    </Card.Text>
            <LinkContainer to="/board/location/futures_triangle_nc/mapset/PERMANENT">
                    <Button variant="secondary">Learn More</Button>
                </LinkContainer>
            </Card.Footer>
        </Card>
    )
}

export default DataWelcomeCard