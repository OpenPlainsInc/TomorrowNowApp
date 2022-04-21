/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/OpenLayers/Sources/ActiniaGeoTiff.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Wednesday, April 20th 2022, 11:50:04 am
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */


import React, { useState, useEffect} from "react"
import useWebSocket, { ReadyState } from 'react-use-websocket';
import WebGLTileLayer from "../Layers/WebGLTileLayer"
import GeoTIFFSource from "./GeoTIFF"
import GrassColors from "../Colors";
import utils from "../Colors/utils";
import Grass from "../../Grass/grass"



// import proj4 from 'proj4';


const ActiniaGeoTiff = ({rasterName, mapsetName, locationName="nc_spm_08",
    style,
    exposure, 
    contrast, 
    saturation, 
    gamma, 
    color,
    minZoom = undefined,
    maxZoom = undefined,
    opacity = 0.5, 
    zIndex = 0 
}) => {
 
    const [socketUrl, setSocketUrl] = useState(null);
    const [messageHistory, setMessageHistory] = useState(['test']);
    const { sendMessage, lastMessage, lastJsonMessage, readyState, getWebSocket } = useWebSocket(socketUrl, { share: false });
    const [source, setSource] = useState(null);
    const [status, setStatus] = useState(null)
    const [resourceId, setResourceId] = useState(null)
    const [dataRangeMin, setDataRangeMin] = useState(null)
    const [dataRangeMax, setDataRangeMax] = useState(null)

    // const [tileStyle, setTileStyle] = useState(style)
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

    // const [exposureValue, setExposureValue] = useState(0)
    // const [contrastValue, setContrastValue] = useState(0)
    // const [saturationValue, setSaturationValue] = useState(0)
    // const [gammaValue, setGammaValue] = useState(1)

    
    const [tileColor, setTileColor] = useState(GrassColors.utils.autoDetectPalette(rasterName))
    const [colorPal, setColorPal] = useState('earth')

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
      }[readyState];

    const API_HOST = "http://localhost:8005/savana"

    // Request data from server
    useEffect(() => {
        let isMounted = true; 
        async function fetchRasters() {
            try {
                let data = await Grass.d.renderGeoTiff(locationName, mapsetName, rasterName)
                console.log("response:", data)
                console.log("response:", data.response.resourceId)
                console.log("response:", data.response.status)

                setResourceId(data.response.resourceId)

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

            const rastersData = `${API_HOST}/r/resource/${rasterName}/stream/${data.resource_id}`
            setDataRangeMin(data.statistics.min)
            setDataRangeMax(data.statistics.max)

            let sourceOptions = {
                sources: [{url: rastersData}], 
                allowFullFile: true, 
                forceXHR: true, 
                normalize: false, // set true for imagery
                convertToRGB: false,
                interpolate: true, // set fault for discrete data
                style: style
            }
            console.log("COG Url: ", rastersData)
            let tmpSource = GeoTIFFSource(sourceOptions)
            setSource(tmpSource)
        }
    }, [lastJsonMessage]);

    

  

    // //Set Color Palette and Style once source is set
    useEffect(()=> {
        if (!source || status !== 'finished') return;
        let colorPalette = GrassColors.utils.autoDetectPalette(rasterName, dataRangeMin, dataRangeMax, 15)
        console.log("Color Palette Set: ", colorPalette)
        setTileColor(colorPalette)
        setTileStyle(prevState => ({
            ...style,
            color: colorPalette
        }))

    },[source, status])

    // Update the Tile Stlye with new color palette
    useEffect(()=> {
        if (!source || !color) return;
        let colorPalette = [
            'interpolate',
            ['linear'],
            ['band', 1],
            ...utils.getColorStops(color, dataRangeMin, dataRangeMax, 15, false)
        ]
        setTileColor(colorPalette)
        setTileStyle(prevState => ({
            ...style,
            color: colorPalette
        }))
    },[source,color])
    // GRASS Projection 3358
    return (
            
                        <WebGLTileLayer 
                            gamma={gamma}
                            opacity={opacity}
                            saturation={saturation}
                            contrast={contrast}
                            exposure={exposure}
                            layerName={rasterName}
                            style={tileStyle}
                            color={tileColor}
                            minZoom={minZoom}
                            maxZoom={maxZoom}
                            source={source}>
                        </WebGLTileLayer>
        
    )
 
  }


export default ActiniaGeoTiff