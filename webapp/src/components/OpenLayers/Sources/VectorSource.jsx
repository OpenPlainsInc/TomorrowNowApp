/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/OpenLayers/Sources/VectorSource.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Wednesday, April 6th 2022, 9:24:07 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */


/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/OpenLayers/Sources/TileWMS.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Wednesday, April 6th 2022, 2:33:10 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */


import OLVectorSource from "ol/source/Vector";
// 

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

export default VectorSource;