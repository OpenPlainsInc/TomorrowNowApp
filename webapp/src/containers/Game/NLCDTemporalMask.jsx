import React, { useEffect, useState, useMemo } from 'react';


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
import {  Fill, Style, Stroke } from "ol/style";
import { watershedSelectionSource } from './watershedSelectionSource';
const NLCDTemporalMask = ({watershed, center=[]}) => {
    console.log(watershed)
    const [osmSource, setOsmSource] = useState(osm()); 
    const [feature, setFeature] = useState(null);
    // let geojson = new GeoJSON().writeFeature(feature, {
    //     dataProjection: 'EPSG:4326', 
    //     featureProjection: 'EPSG:4326' 
    //   })
    // let watershedSource = useGeojsonSource({geojsonObject: geojson})
    let watershedSource = useMemo(()=> watershedSelectionSource({huc12: watershed?.huc12}), [watershed])
    watershedSource.on('addfeature', (e) => {
        setFeature(e.feature)
        console.log(osmSource)
        // osmSource.setExtent(e.feature.getGeometry())
        // osmSource.setExtent(watershedSource.getExtent())
    })
    // console.log("geom: ",geojson)
    const [activeYear, setActiveYear] = useState(2019);

    let nlcdsource = useNLCDSource({year: activeYear, dataType:'land_cover', region:'L48'});

    const clipStyle = new Style({
        fill: new Fill({
          color: 'black',
        }),
      });

    const selectionStyle = new Style({
        stroke: new Stroke({
        //   color: 'rgba(30, 30, 30, 0.7)', //Gray
          color: 'rgba(52, 153, 204, 0.75)', // blue
          width: 2,
        }),
    });

    let clipOnPostRender = (e) => {
        e.stopPropagation()
        if (feature === null) return;
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
        if (feature === null) return;
        let geometry = feature.getGeometry()
        map.getView().fit(geometry, {padding: [50, 50, 50, 50]})
    }

    return (
        <Card>
            <Card.Header as="h2">{watershed.name}</Card.Header>
            <Card.Body>
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
                <Map mapClass="map-row-feature" center={center} zoom={13} projection={'EPSG:4326'} triggerExternalLayerRender={zoomToWatershed}>
                    <Layers>
                       
                        <TileLayer source={osmSource} opacity={0.5} postrender={clipOnPostRender}></TileLayer>
                        <TileLayer 
                            source={nlcdsource} 
                            opacity={0.75} 
                            postrender={clipOnPostRender}
                        ></TileLayer>
                     
                       
                        <VectorLayer 
                            layerName="watershed"
                            zIndex={1}
                            renderMode="vector"
                            style={selectionStyle}
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