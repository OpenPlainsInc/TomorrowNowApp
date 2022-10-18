import React, {useState} from "react";
import OLVectorSource from "ol/source/Vector";
import GeoJSON from 'ol/format/GeoJSON';

/**
 * React component to for OpenLayer Vector source.
 * Source Documentation: 
 *     https://openlayers.org/en/latest/apidoc/module-ol_source_Vector-VectorSource.html
 * @param {*} wmsOptions 
 * @param {*} wmsRequestParams  WMS request parameters
 * @param wmsRequestParams.LAYERS (required) At least a LAYERS param is required. STYLES is '' by default. VERSION is 1.3.0 by default. WIDTH, HEIGHT, BBOX and CRS (SRS for WMS version < 1.3.0) will be set dynamically.
 * @returns TileWMSSource
 */
const VectorSource = ((props)=>{ 
    let source = new OLVectorSource({
        ...props
    })
    return source
     
})

export const useVectorSource = ((props)=> {
    let source = new OLVectorSource({
        ...props
    })
    
    const [vectorSource, setVectorSource] = useState(source);

    return vectorSource
})  

export const useGeojsonSource = (({geojsonObject, ...props})=>{ 
    // const [vectorSource, setVectorSource] = useState(null)
    // console.log("props", props)
    let loadFeatures = (features) => {
        // console.log("loadFeatures", features)
        if (features instanceof GeoJSON) {
            return features
        }
        if (features) {
           return new GeoJSON().readFeatures(features)
        }
        return new GeoJSON()
    }
    
    let source = new OLVectorSource({
        ...props,
        features: loadFeatures(geojsonObject)
    })

    return source
     
})

export default VectorSource;