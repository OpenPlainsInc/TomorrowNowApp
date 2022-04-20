import React, { useState} from "react"
import Container from "react-bootstrap/Container"
import {useParams} from "react-router-dom";
import Map from "../../components/OpenLayers/Map"
import Layers from "../../components/OpenLayers/Layers/Layers"
import TileLayer from "../../components/OpenLayers/Layers/TileLayer"
import GraticuleLayer from "../../components/OpenLayers/Layers/GraticuleLayer"
import { fromLonLat } from 'ol/proj';
import osm from "../../components/OpenLayers/Sources/osm"
import Controls from "../../components/OpenLayers/Controls/Controls";
import { ScaleLineControl, ZoomSliderControl, FullScreenControl, EditMapControl } from "../../components/OpenLayers/Controls";
import Reprojection from "../../components/OpenLayers/Views/Reprojection";
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import utils from "../../components/OpenLayers/Colors/utils";
import {TileDebug} from 'ol/source';
import ActiniaGeoTiff from "../../components/OpenLayers/Sources/ActiniaGeoTiff";


const BoardMap = (props) => {
    let params = useParams();

    const [center, setCenter] = useState( [-79.19996595808385,36.00726441408235,7]);
    const [zoom, setZoom] = useState(1);
    const [opacity, setOpacity] = useState(0.75);

    const [tileStyle, setTileStyle] = useState({
        color: undefined,
        exposure: ['var', 'exposure'],
        contrast: ['var', 'contrast'],
        saturation: ['var', 'saturation'],
        gamma: ['var', 'gamma'],
        variables: {
            exposure: 0,
            contrast: 0,
            saturation: 0,
            gamma: 1,
            color: undefined,
            level: 0
          }
      })

    const [exposureValue, setExposureValue] = useState(0)
    const [contrastValue, setContrastValue] = useState(0)
    const [saturationValue, setSaturationValue] = useState(0)
    const [gammaValue, setGammaValue] = useState(1)
    const [colorPal, setColorPal] = useState('earth')

    //Set TileLayer styles when range moves
    const rangeValue = (key, value) => {
        console.log("rangeValue: ", key, value)
        if (key === 'exposure') setExposureValue(parseFloat(value));
        if (key === 'contrast') setContrastValue(parseFloat(value));
        if (key === 'saturation') setSaturationValue(parseFloat(value));
        if (key === 'gamma') setGammaValue(parseFloat(value));
        if (key === 'opacity') setOpacity(parseFloat(value));
    }

    // Set the updated color palette name
    const updateColor = (e) => {
        if (!e || !colorPal) return;
        console.log("updateColor: ", e.target.value)
        setColorPal(e.target.value)
    }

    // GRASS Projection 3358
    return (
            <Container>
                <h1>{params.rasterId}</h1>
                <Row>
                <Map  center={fromLonLat(center)} zoom={zoom}>

                    <Layers>

                        <TileLayer source={osm()}></TileLayer>
                        <ActiniaGeoTiff 
                            rasterName={params.rasterId} 
                            mapsetName={params.mapsetId}
                            locationName={params.locationId}
                            gamma={gammaValue}
                            opacity={opacity}
                            saturation={saturationValue}
                            contrast={contrastValue}
                            exposure={exposureValue}
                            layerName={params.rasterId}
                            style={tileStyle}
                            color={colorPal}
                            minZoom={0}
                            maxZoom={16}
                            ></ActiniaGeoTiff>
                        

                        <TileLayer zIndex={5} source={new TileDebug()}></TileLayer>
                        <GraticuleLayer></GraticuleLayer>
                    </Layers>

                    <Controls>
                        <FullScreenControl />
                        <ZoomSliderControl />
                        <ScaleLineControl />
                        {/* <RotateControl autoHide={false}/> */}
                        <EditMapControl />
                    </Controls>
                    <Reprojection epsg='3358'></Reprojection> 
                    {/* <Reprojection epsg='3357'></Reprojection>  */}

                </Map>
                </Row>
                <Row>
                <Form style={{marginTop: 50}}>
                <Form.Control as="select" value={colorPal} onChange={updateColor}>
                    {utils.defautColormaps.map((c, idx) =>{
                            return(
                            <option key={idx} value={c}>
                                {c}
                            </option>
                            )
                        })}
                </Form.Control>

                    <Form.Group as={Row}>
                        <Col xs="9">
                        <Form.Label>Opacity</Form.Label>
                        <Form.Range 
                            defaultValue={opacity}
                            onChange={e => rangeValue("opacity", e.target.value)}
                            step="0.1"
                            min="0.0"
                            max="1.0"
                        />
                        </Col>
                        <Col xs="3">
                        <Form.Control
                            value={opacity} 
                            onChange={e => rangeValue("opacity", e.target.value)}/>
                        </Col>
                    </Form.Group>
            
                    <Form.Group as={Row}>
                        <Col xs="9">
                        <Form.Label>Exposure</Form.Label>
                        <Form.Range 
                            defaultValue={exposureValue}
                            onChange={e => rangeValue("exposure", e.target.value)}
                            step="0.1"
                            min="-1"
                            max="1"
                        />
                        </Col>
                        <Col xs="3">
                        <Form.Control
                            value={exposureValue} 
                            onChange={e => rangeValue("exposure", e.target.value)}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Col xs="9">
                        <Form.Label>Contrast</Form.Label>
                        <Form.Range 
                            defaultValue={contrastValue}
                            onChange={e => rangeValue("contrast", e.target.value)}
                            step="0.1"
                            min="-1"
                            max="1"
                        />
                        </Col>
                        <Col xs="3">
                        <Form.Control
                            value={contrastValue} 
                            onChange={e => rangeValue("contrast", e.target.value)}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Col xs="9">
                        <Form.Label>Saturation</Form.Label>
                        <Form.Range 
                            defaultValue={saturationValue}
                            onChange={e => rangeValue("saturation", e.target.value)}
                            step="0.1"
                            min="-1"
                            max="1"
                        />
                        </Col>
                        <Col xs="3">
                        <Form.Control
                            value={saturationValue} 
                            onChange={e => rangeValue("saturation", e.target.value)}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Col xs="9">
                        <Form.Label>Gamma</Form.Label>
                        <Form.Range 
                            defaultValue={gammaValue}
                            onChange={e => rangeValue("gamma", e.target.value)}
                            step="0.1"
                            // min="-1"
                            // max="1"
                        />
                        </Col>
                        <Col xs="3">
                        <Form.Control
                            value={gammaValue} 
                            onChange={e => rangeValue("gamma", e.target.value)}/>
                        </Col>
                    </Form.Group>
                 
                </Form>
                </Row>
            </Container>
        
    )
 
  }


export default BoardMap