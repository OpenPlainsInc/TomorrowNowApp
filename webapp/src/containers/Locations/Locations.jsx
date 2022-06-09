/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/containers/Locations/Locations.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Wednesday, June 8th 2022, 8:13:38 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */


/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/containers/Board/Board.jsx
 * Project: TomorrowNow
 * File Created: Wednesday March 16th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Tu/05/yyyy 04:nn:16
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


import React, { useState, useEffect, useRef} from "react"
import { useLocation, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import ListGroup from "react-bootstrap/ListGroup"
import Tab from "react-bootstrap/Tab"
import Grass from "../../components/Grass/grass";
import { useDataSource } from "../../components/Grass/Utils";
import { LocationLoader } from "../../components/Grass/Locations/LocationLoader";
import { LocationInfo } from "../../components/Grass/Locations/LocationInfo";
import { LocationResponseModel } from "../../components/Grass/Utils/Models/LocationResponseModel";

const Locations = (props) => {  
    let location = useLocation();
    let navigate = useNavigate();
    const grassLocations = useDataSource({getDataFunc: Grass.getLocations, params: []})      
    const [activeLocation, setActiveLocation] = useState(null)

    useEffect(()=> {
        if (activeLocation || !grassLocations || !grassLocations.data || grassLocations.errors) return;
        
        // Check if an active location was already set and if the the grassLocations array is empty
        if (!activeLocation && grassLocations.data.response.locations.length) {
            // Set the default active key to the first item in the array.
            let locationsResponse = new LocationResponseModel({...grassLocations.data.response})
            // Get list of hashes
            let locationHashes = locationsResponse.hash()
            let hash = location.hash
            let activeLocationHash = locationHashes.includes(hash) ? locationHashes.find(loc => loc === hash) : locationHashes[0]
            // Set the active location and remove the hash
            let _activeLocation = locationsResponse.locationIdFromHash(activeLocationHash)
            setActiveLocation(_activeLocation)
            // Set the active locations hash without reloading the page
            navigate(activeLocationHash, { replace: true });
        }
    }, [activeLocation, grassLocations, navigate, location])

    const handleTabClickEvent = (e) => {
        let newActiveLocation = e.target.innerText
        setActiveLocation(newActiveLocation)
    }

    const isActive = (activeLocatioin, locationKey) => {
        return activeLocatioin === locationKey
    }

    return (
        
            <Container fluid className="bg-light text-dark" style={{marginTop: 20}}>
                <Tab.Container id="list-group-tabs-locations" defaultActiveKey={`#${activeLocation}`}>
                    <Row>
                        <Col sm={4}>
                        <ListGroup>
                            { 
                                grassLocations.data ? 
                                    grassLocations.data.response.locations.map((loc, idx) => {
                                        return (
                                            <ListGroup.Item 
                                                key={loc} 
                                                onClick={handleTabClickEvent} 
                                                action 
                                                active={isActive(activeLocation, loc)}
                                                href={`#${loc}`}
                                            >
                                                {loc}
                                            </ListGroup.Item>
                                        )
                                    }) :
                                <></>    
                            }
                        </ListGroup>
                        </Col>
                        <Col sm={8}>
                        <Tab.Content>
                            { 
                                grassLocations.data ? 
                                    grassLocations.data.response.locations.map(loc => {
                                        return (
                                        <Tab.Pane key={loc} active={isActive(activeLocation, loc)} eventKey={`#${loc}`}>
                                            <LocationLoader locationId={loc}>
                                                <LocationInfo/>
                                            </LocationLoader>
                                        </Tab.Pane>)
                                    }) :
                                <></>    
                            }
                        </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Container>
        
    )
 
  }


export default Locations