import React, { useState, useEffect, useRef} from "react"
import Container from "react-bootstrap/Container"
import {useParams} from "react-router-dom";
import Map from "../../components/OpenLayers/Map"
import Layers from "../../components/OpenLayers/Layers/Layers"
import TileLayer from "../../components/OpenLayers/Layers/TileLayer"
import GraticuleLayer from "../../components/OpenLayers/Layers/GraticuleLayer"
import { fromLonLat } from 'ol/proj';
import WebGLTileLayer from "../../components/OpenLayers/Layers/WebGLTileLayer"
import GeoTIFFSource from "../../components/OpenLayers/Sources/GeoTIFF"
import osm from "../../components/OpenLayers/Sources/osm"
import Controls from "../../components/OpenLayers/Controls/Controls";
// import FullScreenControl from "../../components/OpenLayers/Controls/FullScreenControl";
// import ZoomSliderControl from "../../components/OpenLayers/Controls/ZoomSliderControl";
import { ScaleLineControl, ZoomSliderControl, FullScreenControl, RotateControl, EditMapControl } from "../../components/OpenLayers/Controls";
import Reprojection from "../../components/OpenLayers/Views/Reprojection";
import XYZ from 'ol/source/XYZ';
import GeoTIFF from 'ol/source/GeoTIFF';
import {sourcesFromTileGrid} from 'ol/source';
import TileJSON from 'ol/source/TileJSON';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import GrassColors from '../../components/OpenLayers/Colors'
import utils from "../../components/OpenLayers/Colors/utils";
import {OSM, TileDebug} from 'ol/source';


// import proj4 from 'proj4';


const BoardMap = (props) => {
    let params = useParams();
    const [socketUrl, setSocketUrl] = useState(null);
    const [messageHistory, setMessageHistory] = useState(['test']);
    const { sendMessage, lastMessage, lastJsonMessage, readyState, getWebSocket } = useWebSocket(socketUrl, { share: false });

    const [center, setCenter] = useState( [-79.19996595808385,36.00726441408235,8]);
    const [zoom, setZoom] = useState(1);
    const [opacity, setOpacity] = useState(0.75);
    const [source, setSource] = useState(null);
    const [view, setView] = useState(null)
    const [status, setStatus] = useState(null)
    const [resourceId, setResourceId] = useState(null)
    const [dataRangeMin, setDataRangeMin] = useState(null)
    const [dataRangeMax, setDataRangeMax] = useState(null)


    const defaultColor  = GrassColors.utils.autoDetectPalette(params.rasterId)
    const [tileStyle, setTileStyle] = useState({
        // color: GrassColors.utils.autoDetectPalette(params.rasterId),
        color: undefined,
        exposure: ['var', 'exposure'],
        contrast: ['var', 'contrast'],
        saturation: ['var', 'saturation'],
        gamma: ['var', 'gamma'],
        // color: ['var', 'color'],
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
    const [seaLevelValue, setSeaLevelValue] = useState(0)

    
    const [tileColor, setTileColor] = useState(GrassColors.utils.autoDetectPalette(params.rasterId))
    const [colorPal, setColorPal] = useState('earth')

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
      }[readyState];

    let _csrfToken = null;
    const API_HOST = "http://localhost:8005/savana"

    async function getCsrfToken() {
        if (_csrfToken === null) {
            const response = await fetch(`${API_HOST}/csrf/`, {
            credentials: 'include',
            });
            const data = await response.json();
            _csrfToken = data.csrfToken;
        }
        return _csrfToken;
    }

    // Request data from server
    useEffect(() => {
        let isMounted = true; 
        async function fetchRasters() {
            try {
                let rasterId = params.rasterId
                const csrftoken = document.cookie
                        .split('; ')
                        .find(row => row.startsWith('csrftoken='))
                        .split('=')[1];

                let url = new URL(`${API_HOST}/r/geotiff/${rasterId}/PERMANENT`)

                const res = await fetch(url, {
                    method: "GET",
                    // headers: {
                    //     'X-CSRFToken': await getCsrfToken()
                    // },Home
                    // credentials: 'include'
                });
                const data = await res.json();
                console.log("response:", data)
                console.log("response:", data.response.resourceId)
                console.log("response:", data.response.status)

                setResourceId(data.response.resourceId)

                function oldCode() {
                // setStatus(data.response.status)

                // function removeHttp(url) {
                //     return url.replace(/^https?:\/\/actinia-core/, 'localhost');
                // }
               
                // const rastersData = `http://actinia-gdi:actinia-gdi@${removeHttp(data.response.imagedata)}`
                // const rastersData = 'http://localhost:3000/ql2_10m.tif'
                // console.log("rastersData:", rastersData)
                // let sourceOptions = {sources: [{url: rastersData}]}
                // let tmpSource = GeoTIFFSource(sourceOptions)

                // let tmpSouce = new GeoTIFF({
                //     // normalize: false,
                //     // credentials: 'actinia-gdi:actinia-gdi',
                //     // allowFullFile: true,
                //     sources: [
                //         {
                //             url: rastersData
                //         }
                //         // {
                //         //     url: 'https://storage.googleapis.com/download/storage/v1/b/tomorrownow-actinia-dev/o/dem_10m_mosaic_cog.tif?alt=media',//rastersData,
                //         // }
                //         // {
                //         //     url: 'http://localhost:5000/singleband/dem/ql2/10m/${z}/${x}/${y}.png'
                //         // }
                //         // {
                //         //     url:'http://localhost:3000/ql2_10m.tif'
                //         // }
                //         // {
                //         //     url: 'https://sentinel-cogs.s3.us-west-2.amazonaws.com/sentinel-s2-l2a-cogs/2020/S2A_36QWD_20200701_0_L2A/TCI.tif'
                //         // }
                       
                //     ],
                // })

                // const xyzSource = new XYZ({
                //     url:'http://localhost:7000/cog/tiles/{z}/{x}/{y}@{scale}x.tif?TileMatrixSetId=WebMercatorQuad&url=https%3A%2F%2Fstorage.googleapis.com%2Fdownload%2Fstorage%2Fv1%2Fb%2Ftomorrownow-actinia-dev%2Fo%2Fdem_10m_mosaic_cog.tif%3Falt%3Dmedia&bidx=1&unscale=false&resampling=nearest&rescale=0%2C2000&rescale=0%2C1000&rescale=0%2C10000&colormap_name=magma&return_mask=true',
                // })

                // const tileJson = new TileJSON({
                //     tileJSON: {
                //     "tilejson": "2.2.0",
                //     "version": "1.0.0",
                //     "scheme": "xyz",
                //     "tiles": [
                //       "http://localhost:7000/cog/tiles/WebMercatorQuad/{z}/{x}/{y}@1x.tif?url=https%3A%2F%2Fstorage.googleapis.com%2Fdownload%2Fstorage%2Fv1%2Fb%2Ftomorrownow-actinia-dev%2Fo%2Fdem_10m_mosaic_cog.tif%3Falt%3Dmedia&bidx=1&unscale=false&resampling=nearest&rescale=0%2C2000&rescale=0%2C1000&rescale=0%2C10000&colormap_name=terrain&return_mask=true"
                //     ],
                //     "minzoom": 8,
                //     "maxzoom": 14,
                //     "bounds": [
                //       -80.13177442636383,
                //       35.462158792878206,
                //       -78.26815748980388,
                //       36.55237003528649
                //     ],
                //     "center": [
                //       -79.19996595808385,
                //       36.00726441408235,
                //       8
                //     ]
                //   }});

                // const pyramid = sourcesFromTileGrid(
                //     tileGrid,
                //     ([z, x, y]) =>
                //       new GeoTIFF({
                //         sources: [
                //           {
                //             url:`http://localhost:7000/cog/tiles/${z}/${x}/${y}@1x.tif?TileMatrixSetId=WebMercatorQuad&url=https%3A%2F%2Fstorage.googleapis.com%2Fdownload%2Fstorage%2Fv1%2Fb%2Ftomorrownow-actinia-dev%2Fo%2Fdem_10m_mosaic_cog.tif%3Falt%3Dmedia&bidx=1&unscale=false&resampling=nearest&rescale=0%2C2000&rescale=0%2C1000&rescale=0%2C10000&colormap_name=magma&return_mask=true`,
                //         },
                //         ],
                //       })
                //   )

                // const xyzSource = new TileLayer({
                //     source: new XYZ({
                //       url:'http://localhost:7000/cog/tiles/{z}/{x}/{y}@{scale}x.tif?TileMatrixSetId=WebMercatorQuad&url=https%3A%2F%2Fstorage.googleapis.com%2Fdownload%2Fstorage%2Fv1%2Fb%2Ftomorrownow-actinia-dev%2Fo%2Fdem_10m_mosaic_cog.tif%3Falt%3Dmedia&bidx=1&unscale=false&resampling=nearest&rescale=0%2C2000&rescale=0%2C1000&rescale=0%2C10000&colormap_name=magma&return_mask=true',
                //     }),
                //   })

                // setSource(tmpSource)
                }
                if (isMounted) setStatus(data.response.status);
              } catch (e) {
                console.log(e);
            }
            return () => { isMounted = false }
        }
        fetchRasters()
      }, [])

      // Get Websocket message history
      useEffect(() => {
        if (lastMessage !== null) {
          setMessageHistory((prev) => prev.concat(lastMessage));
        }
      }, [lastMessage, setMessageHistory]);

      // Open Websocket Connention for resource
      useEffect(()=> {
        if (!resourceId || !status) return;
        console.log("Starting Websocket...")
        console.log("Websocket: ResourceId Received...")
        console.log(`Websocket: Resource Id: ${resourceId}`)
        let resourceName = resourceId.replace(/-/g , '_')
        console.log(`Websocket: Resource Name: ${resourceName}`)

        // setSocketUrl( `ws://localhost:8005/ws/savana/resource/${params.rasterId}/`)
        setSocketUrl( `ws://localhost:8005/ws/savana/resource/${resourceName}/`)

    },[source, status, resourceId])

    // Send websocket status message to server
    useEffect(()=> {
        if (readyState != ReadyState.OPEN) return;
        console.log("Sending Websocket Message: ", status)
        sendMessage(JSON.stringify({message: status, resource_id: resourceId}))
        setMessageHistory([{message: status, resource_id: resourceId}])
    },[connectionStatus])

    // Log last message from Websocket
    useEffect(()=> {
        if (readyState != ReadyState.OPEN) return;
        console.log("Last Websocket Message", lastMessage)

    },[lastMessage])

    // Set source data once data is finished
    useEffect(() => {
        if (!lastJsonMessage) return;
        console.log("Last Message: ", lastJsonMessage)
        if (lastJsonMessage) {
            let data = lastJsonMessage
            setStatus(data.message)

            const rastersData = `${API_HOST}/r/resource/${params.rasterId}/stream/${data.resource_id}`
            setDataRangeMin(data.statistics.min)
            setDataRangeMax(data.statistics.max)

            let sourceOptions = {
                sources: [{url: rastersData}], 
                allowFullFile: true, 
                forceXHR: true, 
                normalize: false, // set true for imagery
                convertToRGB: false,
                interpolate: true, // set fault for discrete data
                style: tileStyle
            }
            console.log("COG Url: ", rastersData)
            let tmpSource = GeoTIFFSource(sourceOptions)
            setSource(tmpSource)
        }
    }, [lastJsonMessage]);

    

    //Set TileLayer styles when range moves
    const rangeValue = (key, value) => {
        console.log("rangeValue: ", key, value)
        if (key === 'exposure') setExposureValue(parseFloat(value));
        if (key === 'contrast') setContrastValue(parseFloat(value));
        if (key === 'saturation') setSaturationValue(parseFloat(value));
        if (key === 'gamma') setGammaValue(parseFloat(value));
        if (key === 'opacity') setOpacity(parseFloat(value));
    }

    //Set Color Palette and Style once source is set
    useEffect(()=> {
        if (!source || status !== 'finished') return;
        let colorPalette = GrassColors.utils.autoDetectPalette(params.rasterId, dataRangeMin, dataRangeMax, 15)
        console.log("Color Palette Set: ", colorPalette)
        setTileColor(colorPalette)
        setTileStyle(prevState => ({
            ...tileStyle,
            color: colorPalette
        }))

    },[source, status])

    // Set the updated color palette name
    const updateColor = (e) => {
        if (!e || !colorPal) return;
        console.log("updateColor: ", e.target.value)
        setColorPal(e.target.value)
    }

    // Update the Tile Stlye with new color palette
    useEffect(()=> {
        if (!source || !colorPal) return;
        let colorPalette = [
            'interpolate',
            ['linear'],
            ['band', 1],
            ...utils.getColorStops(colorPal, dataRangeMin, dataRangeMax, 15, false)
        ]
        setTileColor(colorPalette)
        setTileStyle(prevState => ({
            ...tileStyle,
            color: colorPalette
        }))
    },[source,colorPal])
    // GRASS Projection 3358
    return (
            <Container>
                <h1>Connection Status: {connectionStatus}</h1>
                <h1>{resourceId}: {status}</h1>
                {/* <Map  center={fromLonLat(center)} zoom={zoom} projection='EPSG:3857' > */}
                {/* <Map  center={fromLonLat(center)} zoom={zoom} projection='EPSG:3358' > */}

                <Map  center={fromLonLat(center)} zoom={zoom}>

                    <Layers>

                        <TileLayer source={osm()}></TileLayer>
                        <WebGLTileLayer 
                            gamma={gammaValue}
                            opacity={opacity}
                            saturation={saturationValue}
                            contrast={contrastValue}
                            exposure={exposureValue}
                            layerName={params.rasterId}
                            style={tileStyle}
                            color={tileColor}
                            minZoom={0}
                            maxZoom={16}
                            source={source}>
                        </WebGLTileLayer>
                        {/* <TileLayer zIndex={4} source={source} ></TileLayer> */}

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
                    {/* <Reprojection epsg='3857'></Reprojection>                   */}
                    <Reprojection epsg='3358'></Reprojection> 
                    {/* <Reprojection epsg='6542'></Reprojection>                   */}
                   
                </Map>

                <ul>
                    {messageHistory.map((message, idx) => (
                    <span key={idx}>{message ? message.data : null}</span>
                    ))}
                </ul>
                <Form>
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
                    <Form.Group as={Row}>
                        <Col xs="9">
                        <Form.Label>Sea Level</Form.Label>
                        <Form.Range 
                            defaultValue={seaLevelValue}
                            onChange={e => rangeValue("seaLevel", e.target.value)}
                            step="1"
                            min="0"
                            max="100"
                        />
                        </Col>
                        <Col xs="3">
                        <Form.Control
                            value={seaLevelValue} 
                            onChange={e => rangeValue("seaLevel", e.target.value)}/>
                        </Col>
                    </Form.Group>
                </Form>
               
            </Container>
        
    )
 
  }


export default BoardMap