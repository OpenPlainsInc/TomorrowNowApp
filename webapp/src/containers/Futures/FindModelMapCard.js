/*
 * Filename: FindModelMapCard.js
 * Project: TomorrowNow
 * File Created: Wednesday September 21st 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Wed Sep 21 2022
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
import React, { useState } from 'react';
import './find-model-map-card.scss';
import Card from 'react-bootstrap/Card';
import FormControl from "react-bootstrap/FormControl"
import InputGroup from "react-bootstrap/InputGroup"
import Button from 'react-bootstrap/Button';
import Map from '../../components/OpenLayers/Map';
import Layers from '../../components/OpenLayers/Layers/Layers';
import TileLayer from "../../components/OpenLayers/Layers/TileLayer"
import VectorLayer from "../../components/OpenLayers/Layers/VectorLayer"
import { VectorTileLayer } from "../../components/OpenLayers/Layers/VectorTileLayer";
import { useVectorTileSource, useNLCDSource, osm } from '../../components/OpenLayers/Sources';
import { countyStyle } from '../../components/OpenLayers/Sources/hucBoundaries';
import Events from '../../components/OpenLayers/Events/Events';
import OnMapEvent from '../../components/OpenLayers/Events/onMapEvent';

const FindModelMapCard = () => {

    const DEFAULT_CENTER = [-95.54, 38.03];
    const DEFAULT_ZOOM = 4.25;
    const DEFAULT_PROJ = 'EPSG:4326';
    const [osmSource, setOsmSource] = useState(osm()); 

    let nlcdsource = useNLCDSource({year:'2019', dataType:'land_cover', region:'L48'});
    let countySource = useVectorTileSource({
        layerName:"savana:cb_2018_us_county_500k",
        baseUrl:`http://localhost:8600/geoserver/gwc/service/wmts`,
        projection: DEFAULT_PROJ
      })

    return (
        <Card>
            <Card.Header as="h2">Find a Model</Card.Header>
            <Card.Body>
                <Card.Subtitle>
                    <InputGroup style={{marginBottom: 10}}>
                        <InputGroup.Text id="basic-addon1"><i className="fa-solid fa-magnifying-glass"></i></InputGroup.Text>
                        <FormControl
                        placeholder="Search Data"
                        aria-label="Search"
                        aria-describedby="basic-addon1"
                        // onChange={filterData}
                        />
                    </InputGroup>
                    </Card.Subtitle>
                <Map mapClass="find-model-map" center={DEFAULT_CENTER} zoom={DEFAULT_ZOOM} projection={DEFAULT_PROJ}>
                    <Layers>
                        <TileLayer source={nlcdsource} opacity={0.75}></TileLayer>
                        <TileLayer source={osmSource} opacity={0.5}></TileLayer>
                        <VectorTileLayer 
                            layerName="counties"
                            zIndex={1}
                            minZoom={4}
                            declutter={true}
                            renderMode="vector"
                            style={countyStyle(1)}
                            source={countySource}
                        />
                    </Layers>
                    <Events>

                    </Events>
                </Map>
                
            </Card.Body>
            <Card.Footer>
            
            </Card.Footer>
        </Card>
        
    )
}

export default FindModelMapCard