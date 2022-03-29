import React, { useState, useEffect, useRef} from "react"
import Container from "react-bootstrap/Container"
import {useParams} from "react-router-dom";
import Map from "../../components/OpenLayers/Map"
import Layers from "../../components/OpenLayers/Layers/Layers"
import TileLayer from "../../components/OpenLayers/Layers/TileLayer"
import { fromLonLat } from 'ol/proj';
import WebGLTileLayer from "../../components/OpenLayers/Layers/WebGLTileLayer"
import GeoTIFFSource from "../../components/OpenLayers/Sources/GeoTIFF"
import osm from "../../components/OpenLayers/Sources/osm"
import Controls from "../../components/OpenLayers/Controls/Controls";
import FullScreenControl from "../../components/OpenLayers/Controls/FullScreenControl";
import ZoomSliderControl from "../../components/OpenLayers/Controls/ZoomSliderControl";
import Reprojection from "../../components/OpenLayers/Views/Reprojection";
import XYZ from 'ol/source/XYZ';
import GeoTIFF from 'ol/source/GeoTIFF';
import {sourcesFromTileGrid} from 'ol/source';
import TileJSON from 'ol/source/TileJSON';
import useWebSocket, { ReadyState } from 'react-use-websocket';


// import proj4 from 'proj4';


const BoardMap = (props) => {
    let params = useParams();
    const [socketUrl, setSocketUrl] = useState(null);
    const [messageHistory, setMessageHistory] = useState(['test']);
    const { sendMessage, lastMessage, lastJsonMessage, readyState, getWebSocket } = useWebSocket(socketUrl, { share: false });

    const [center, setCenter] = useState([0, 0]);
    const [zoom, setZoom] = useState(1);
    const [source, setSource] = useState(null);
    const [view, setView] = useState(null)
    const [status, setStatus] = useState(null)
    const [resourceId, setResourceId] = useState(null)

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
                    // },
                    // credentials: 'include'
                });
                const data = await res.json();
                console.log("response:", data)
                console.log("response:", data.response.resourceId)
                console.log("response:", data.response.status)

                setResourceId(data.response.resourceId)
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

                if (isMounted) setStatus(data.response.status);
              } catch (e) {
                console.log(e);
            }
            return () => { isMounted = false }
        }
        fetchRasters()
      }, [])

    //   useEffect(() => {
    //     if(source) {
    //         console.log("Source:", source)
    //         source.getView().then(v => {
    //             console.log("View:",v)
               
    //         })
    //         setView(source.getView())
           
    //     } 
    //   }, [source])
      useEffect(() => {
        if (lastMessage !== null) {
          setMessageHistory((prev) => prev.concat(lastMessage));
        }
      }, [lastMessage, setMessageHistory]);

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

    useEffect(()=> {
        if (readyState != ReadyState.OPEN) return;
        console.log("Sending Websocket Message: ", status)
        sendMessage(JSON.stringify({message: status, resource_id: resourceId}))
        setMessageHistory([{message: status, resource_id: resourceId}])
    },[connectionStatus])


    useEffect(()=> {
        if (readyState != ReadyState.OPEN) return;
        console.log("Last Websocket Message", lastMessage)

    },[lastMessage])

    useEffect(() => {
        if (!lastJsonMessage) return;
        console.log("Last Message: ", lastJsonMessage)
        if (lastJsonMessage) {
            let data = lastJsonMessage
            setStatus(data.message)
            

            function removeHttp(url) {
                    return url.replace(/^https?:\/\/actinia-core/, 'localhost');
                }
               
            const rastersData = `http://actinia-gdi:actinia-gdi@${removeHttp(data.resources[0])}`
            let sourceOptions = {sources: [{url: rastersData}]}
            let tmpSource = GeoTIFFSource(sourceOptions)
            setSource(tmpSource)
        }
    }, [lastJsonMessage]);


    
    
      
    return (
            <Container>
                <h1>Connection Status: {connectionStatus}</h1>
                <h1>{resourceId}: {status}</h1>
                {/* <h3>{lastMessage.data}</h3> */}
                {/* <h1>Last Message: {lastJsonMessage}</h1> */}
                <Map  center={fromLonLat(center)} zoom={zoom} projection='EPSG:3857' >
                {/* <Map  center={fromLonLat(center)} zoom={zoom} projection='EPSG:32636' > */}
                {/* <Map  center={fromLonLat(center)} zoom={zoom} altView={view}> */}

                    <Layers>
                        <TileLayer source={osm()}></TileLayer>
                        <TileLayer source={source}></TileLayer>
                       
                        {/* <TileLayer source={source}></TileLayer> */}
                        {/* <WebGLTileLayer 
                            layerName={params.rasterId}
                            source={source}>
                        </WebGLTileLayer> */}
                                          


                    </Layers>

                    <Controls>
                        <FullScreenControl />
                        <ZoomSliderControl />
                    </Controls>
                    {/* <Reprojection epsg='3857'></Reprojection> */}
                    {/* <Reprojection epsg='32636'></Reprojection> */}
                    
                </Map>

                <ul>
                    {messageHistory.map((message, idx) => (
                    <span key={idx}>{message ? message.data : null}</span>
                    ))}
                </ul>

            </Container>
        
    )
 
  }


export default BoardMap