// import { useContext, useEffect } from "react";
// import MapContext from "../MapContext";
// import GeoTIFF from 'ol/source/GeoTIFF';
import GeoTIFF from 'ol/source/GeoTIFF';

const GeoTIFFSource = ({ 
  sources, 
  normalize=false, 
  convertToRGB=false, 
  opaque=0, 
  transition=250, 
  wrapX=false, 
  interpolate=true, 
  allowFullFile=false, 
  forceXHR=false }) => {
    let source = new GeoTIFF({
      sources,
      // Optional
      normalize,
      convertToRGB,
      opaque,
      transition,
      wrapX,
      interpolate,
     
      sourceOptions: {
        allowFullFile,
        forceXHR,
        // headers,
        // credentials,
        // maxRanges,
        blockSize:65536,
        cacheSize:100
      }

    });
    return source
}

export default GeoTIFFSource;