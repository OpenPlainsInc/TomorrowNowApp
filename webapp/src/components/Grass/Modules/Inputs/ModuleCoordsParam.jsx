/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/Grass/Modules/Inputs/ModuleCoordsParam.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Friday, April 22nd 2022, 5:27:15 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */


// react
import React, { useState, useEffect, useId } from 'react';


import '../module.scss';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Form from 'react-bootstrap/Form'
import Map from "../../../OpenLayers/Map"
import Layers from "../../../OpenLayers/Layers/Layers"
import osm from "../../../OpenLayers/Sources/osm"
import TileLayer from "../../../OpenLayers/Layers/TileLayer"
import Events from "../../../OpenLayers/Events/Events"
import MapEvent from "../../../OpenLayers/Events/onMapEvent"
import VectorSource from '../../../OpenLayers/Sources/VectorSource';
import VectorLayer from '../../../OpenLayers/Layers/VectorLayer';

import Interactions from '../../../OpenLayers/Interactions/Interactions';
import {Draw} from '../../../OpenLayers/Interactions/';

const ModuleCoordsParam = ({param , region}) => {

    const [subtype, setSubtype] = useState(null);
    const [defaultOption, setDefaultOption] = useState(0);
    const [xValue, setXValue] = useState(0);
    const [yValue, setYValue] = useState(0);

    const [center, setCenter] = useState([-78.6802,35.8408])
    const [zoom, setZoom] = useState(9)
    const [pointFeatures, setPointFeatures]  = useState([])

   

    const [pointSource, setPointSource] = useState(VectorSource({
        wrap: false, 
    }))

   

    const [coordLayerName, setCoordLayerName] = useState("point_layer")
    console.log('ModuleCoordsParam')


    const handleFeatureRemove = (e) => {
        // console.log("handleFeatureRemove", e)
        // e.target.features.map(f => f.setProperties({status: 'last'}))
    }
    pointSource.on('removefeature',handleFeatureRemove )

    const onMapClick = (e) => {
        if (!pointSource) return;
        // pointSource.clear()
        let coords = e.coordinate
        let x = coords[0]
        let y = coords[1]
        console.log("Map Click", x, y, e)
        let layer =  e.target.getLayers().getArray().filter(l => l.get('name') === coordLayerName)
        console.log("Map Layers", layer)
        let source = layer.map(l => l.getSource())
        console.log("Map Source", source)
        let features = source.map(f => f.getFeatures())[0]
        let oldPoint = features.filter(f => f.get('status') === 'old')
        let newPoint = features.filter(f => !f.get('status'))
        console.log("New Point", newPoint)
        console.log("Old Point", oldPoint)
        if (features.length === 1) {
            features[0].setProperties({status: 'old'})
        } else {
            source.map(s=> s.removeFeature(...oldPoint))
        }
        
        if (newPoint.length === 1) {
            newPoint[0].setProperties({status: 'old'})
        }
        
        console.log("Map Features", features, pointFeatures)

        setXValue(parseFloat(x))
        setYValue(parseFloat(y))
    }

    // const updateValue = (val) {

    // }

  
    useEffect(() => {
       
        if (!param) return;
        if (param.schema.type !== 'number') {
            return console.error(`GRASS module parameter ${param.name} is not a number`, param)
        }
        if (param.schema.hasOwnProperty('subtype') && param.schema.subtype !== 'coords') {
            return console.error(`GRASS module parameter ${param.name} is not a coords param`, param)
        }
    }, [param, subtype, defaultOption ])
  


    
  
    return (  
        <Row className="mb-3">
            <Form.Group as={Col} controlId={`moduleCoordsMapX.${param.name}`} className="mb-3">
                <Form.Label column sm={2}>x</Form.Label>
                        <Form.Control 
                            type="number" 
                            onChange={()=> {}}
                            value={xValue}
                            placeholder={param.schema.type} 
                        />
            </Form.Group>
            <Form.Group as={Col} controlId={`moduleCoordsMapY.${param.name}`} className="mb-3">
                <Form.Label column sm={2}>y</Form.Label>
                    <Form.Control 
                        type="number" 
                        onChange={()=> {}}
                        value={yValue}
                        placeholder={param.schema.type} 
                    />
                </Form.Group>

                <Row>
                    <Map mapClass="module_map" center={center} zoom={zoom} projection='EPSG:4326'>
                            <Layers>
                                <TileLayer source={osm()}></TileLayer>
                                <VectorLayer layerName={coordLayerName} source={pointSource}></VectorLayer>
                            </Layers>
                            <Events>
                                <MapEvent eventName="click" eventHandler={onMapClick}></MapEvent>
                            </Events>
                            <Interactions>
                                <Draw source={pointSource} features={pointFeatures} isActive={true}></Draw>
                            </Interactions>
                    </Map>
                </Row>
        </Row>


        
    )
}


export default ModuleCoordsParam




