/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/OpenLayers/Sources/ActiniaGeoTiff.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Wednesday, April 20th 2022, 11:50:04 am
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */


import React, { useState, useEffect} from "react"
import WebGLTileLayer from "../Layers/WebGLTileLayer"
import GeoTIFFSource from "./GeoTIFF"
import GrassColors from "../Colors";
import utils from "../Colors/utils";
import Grass from "../../Grass/grass"
import { useActiniaAsyncProcess } from '../../Grass/Utils/useActiniaAsyncProcess';



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
 
    const [dataUrl, setDataUrl] = useState(null)
    const [source, setSource] = useState(null);
    const [status, setStatus] = useState(null)
    const [resourceId, setResourceId] = useState(null)
    const [dataRangeMin, setDataRangeMin] = useState(0)
    const [dataRangeMax, setDataRangeMax] = useState(100)
    const [grassColorScheme, setGrassColorScheme] = useState(null)

    const {lastJsonMessage, messageHistory, wsState} = useActiniaAsyncProcess({resourceId, status})
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

    const API_HOST = "http://localhost:8005/savana"

    // Request data from server
    useEffect(() => {
        if (!rasterName || !mapsetName || !locationName) return;
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
      }, [rasterName, locationName, mapsetName])

     

    // Set source data once data is finished
    useEffect(() => {
        if (!lastJsonMessage) return;
        console.log("Last Message: ", lastJsonMessage)
        if (lastJsonMessage) {
            let data = lastJsonMessage
            setStatus(data.message)

            const rastersData = `${API_HOST}/r/resource/${rasterName}/stream/${data.resource_id}`
            setDataUrl(rastersData)
            if (data.statistics) {
                setDataRangeMin(data.statistics.min)
                setDataRangeMax(data.statistics.max)
            }
            

           
        }
    }, [lastJsonMessage, rasterName]);


    useEffect(()=> {
        (async () => {
            let data = await GrassColors.grass.fetchScheme(locationName, mapsetName, rasterName)
            console.log("GRASS color scheme:", data)
            let scheme = GrassColors.grass.parseResults(data.response.process_results)
            setGrassColorScheme(scheme)
            console.log("GRASS color scheme:", scheme)
        })()
    },[locationName, mapsetName, rasterName])

    

  

    // //Set Color Palette and Style once source is set
    useEffect(()=> {
        if (status !== 'finished') return;

        let sourceOptions = {
            sources: [{url: dataUrl}], 
            allowFullFile: true, 
            forceXHR: true, 
            normalize: false, // set true for imagery
            convertToRGB: false,
            interpolate: true, // set fault for discrete data
            style: style
        }
        let tmpSource = GeoTIFFSource(sourceOptions)
        setSource(tmpSource)
        
        let colorPalette = color === 'grass' && !rasterName.includes("nlcd") ? grassColorScheme : GrassColors.utils.autoDetectPalette(rasterName, dataRangeMin, dataRangeMax, 15)
        console.log("Color Palette Set: ", colorPalette)
        setTileColor(colorPalette)
        setTileStyle(prevState => ({
            ...style,
            color: colorPalette
        }))

    },[status])

    // Update the Tile Stlye with new color palette
    useEffect(()=> {
        if (!source || !color) return;
        console.log("update color", color)
        
        let colorPalette = color !== 'grass' ? [
            'interpolate',
            ['linear'],
            ['band', 1],
            ...utils.getColorStops(color, dataRangeMin, dataRangeMax, 15, false)
        ] : !rasterName.includes("nlcd") ? grassColorScheme : GrassColors.utils.autoDetectPalette(rasterName, dataRangeMin, dataRangeMax, 15)
        setTileColor(colorPalette)
        setTileStyle(prevState => ({
            ...style,
            color: colorPalette
        }))
    },[source, color])
    // GRASS Projection 3358
    return (
        status === "finished" ?
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
            source={source}/>
        :
        null
        
    )
 
  }


export default ActiniaGeoTiff