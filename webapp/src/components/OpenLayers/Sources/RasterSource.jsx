/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/OpenLayers/Sources/RasterSource.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Friday, May 20th 2022, 5:34:02 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */
import Raster from "ol/source/Raster"
// https://openlayers.org/en/latest/apidoc/module-ol_source_Raster.html
export const RasterSource = (props) => {
    let source = new Raster({
        ...props
    })
    return source

}
