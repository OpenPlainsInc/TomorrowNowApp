import React, { useEffect, useState } from 'react';


import Card from 'react-bootstrap/Card';
import InputGroup from "react-bootstrap/InputGroup"
import Map from '../../components/OpenLayers/Map';
import Layers from '../../components/OpenLayers/Layers/Layers';
import TileLayer from "../../components/OpenLayers/Layers/TileLayer"
import VectorLayer from "../../components/OpenLayers/Layers/VectorLayer"
import { useVectorTileSource, useNLCDSource, osm } from '../../components/OpenLayers/Sources';
import Form from 'react-bootstrap/Form';
import Events from '../../components/OpenLayers/Events/Events';
import OnMapEvent from '../../components/OpenLayers/Events/onMapEvent';
import GeoJSON from 'ol/format/GeoJSON';
import { useGeojsonSource } from '../../components/OpenLayers/Sources/VectorSource';
import {getVectorContext} from 'ol/render';
import {  Fill, Style } from "ol/style";
const NLCDTemporalMask = ({watershedName="", feature=null, center=[]}) => {
    const [osmSource, setOsmSource] = useState(osm()); 
    let geojson = new GeoJSON().writeFeature(feature, {
        dataProjection: 'EPSG:4326', 
        featureProjection: 'EPSG:4326' 
      })
    let watershedSource = useGeojsonSource({geojsonObject: geojson})

    watershedSource.on('addfeature', () => {
        osmSource.setExtent(watershedSource.getExtent())
    })
    // console.log("geom: ",geojson)
    const [activeYear, setActiveYear] = useState(2019);

    let nlcdsource = useNLCDSource({year: activeYear, dataType:'land_cover', region:'L48'});

    const clipStyle = new Style({
        fill: new Fill({
          color: 'black',
        }),
      });

    let clipOnPostRender = (e) => {
        e.stopPropagation()
        const vectorContext = getVectorContext(e);
        e.context.globalCompositeOperation = 'destination-in';
        vectorContext.drawFeature(feature, clipStyle);
        watershedSource.forEachFeature(function (feature) {
            vectorContext.drawFeature(feature, clipStyle);
          });
        e.context.globalCompositeOperation = 'source-over';
    }

    const avaliableYears = [
        '2019',
        '2016',
        '2013',
        '2011',
        '2008',
        '2006',
        '2004',
        '2001'
    ]
    
    const handleSeletionEvent = (e) => {
        let newValue = e.target.value
        setActiveYear(newValue)
    }

    const zoomToWatershed = (map) => {
        let geometry = feature.getGeometry()
        map.getView().fit(geometry, {padding: [100, 50, 50, 100]})
    }

    return (
        <Card>
            <Card.Header as="h2">{watershedName}</Card.Header>
            <Card.Body>
                {/* <Card.Subtitle style={{marginBottom: 10}}>Click on the map to select up to 5 connected counties to form your region of interest.</Card.Subtitle> */}
                <Card.Subtitle>

                    <InputGroup style={{marginBottom: 10}}>
                   
                    <InputGroup.Text id="basic-addon1">Type</InputGroup.Text>
                    <Form.Control as="select" value={activeYear} onChange={handleSeletionEvent}>
                    { avaliableYears.map((c, idx) => {
                            return(
                            <option key={idx} value={c}>
                                {c}
                            </option>
                            )
                        })
                    }
                    </Form.Control>

                    </InputGroup>
                </Card.Subtitle>
                <Map mapClass="find-model-map" center={center} zoom={13} projection={'EPSG:4326'} triggerExternalLayerRender={zoomToWatershed}>
                    <Layers>
                       
                        <TileLayer source={osmSource} opacity={0.5}></TileLayer>
                        <TileLayer 
                            source={nlcdsource} 
                            opacity={0.75} 
                            postrender={clipOnPostRender}
                        ></TileLayer>
                     
                        <VectorLayer 
                            layerName="watershed"
                            zIndex={1}
                            // declutter={true}
                            renderMode="vector"
                            style={null}
                            source={watershedSource}
                        />
                        
                    </Layers>
                    <Events>
                        {/* <OnMapEvent eventName='click' eventHandler={onClickEvent}></OnMapEvent> */}
                    </Events>
                </Map>
                
            </Card.Body>
            <Card.Footer>
                
            </Card.Footer>
        </Card>
    )
}

export default NLCDTemporalMask