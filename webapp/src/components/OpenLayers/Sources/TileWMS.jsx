/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/OpenLayers/Sources/TileWMS.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Wednesday, April 6th 2022, 2:33:10 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */


import TileWMS from 'ol/source/TileWMS'
// 

/**
 * React component to for OpenLayer TileWMS source.
 * Source Documentation: 
 *      https://openlayers.org/en/latest/apidoc/module-ol_source_TileWMS-TileWMS.html
 * @param {*} wmsOptions 
 * @param {*} wmsRequestParams  WMS request parameters
 * @param wmsRequestParams.LAYERS (required) At least a LAYERS param is required. STYLES is '' by default. VERSION is 1.3.0 by default. WIDTH, HEIGHT, BBOX and CRS (SRS for WMS version < 1.3.0) will be set dynamically.
 * @returns TileWMSSource
 */
const TileWMSSource = ((wmsOptions, wmsRequestParams)=>{ 

    // if (!Object.hasOwn(wmsRequestParams, 'LAYERS')) { Not supported yet
    // if (!typeof wmsRequestParams === 'object' || !wmsRequestParams.hasOwnProperty('LAYERS')) {
    //     console.error("TileWMSSource requires a LAYERS param defined in wmsRequestParams Object")
    //     return null
    // }

    let defaultWmsRequestParams = {
        LAYERS: ''
    }

    let defaultParams = {
        attributions: undefined,
        attributionsCollapsible: false,
        cacheSize: undefined,
        crossOrigin: undefined, //'anonymous',
        imageSmoothing: true,
        interpolate: true,
        params: defaultWmsRequestParams,
        gutter: 0,
        hidpi: true,
        projection: undefined,
        reprojectionErrorThreshold: 0.5,
        tileClass: undefined,
        tileGrid: undefined,
        
        serverType: 'mapserver',
        url: undefined,
        urls: undefined,
        wrapX: true,
        transition: undefined,
        zDirection: 0
    }

    //Set the default params first then overwrite them if repacements are provided in params
    let source = new TileWMS({
        ...defaultParams,
        ...wmsOptions,
        params: {
            ...defaultWmsRequestParams,
            ...wmsRequestParams
        }
    })

    return source
     
})

export default TileWMSSource;