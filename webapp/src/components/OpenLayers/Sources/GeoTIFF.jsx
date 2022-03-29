// import { useContext, useEffect } from "react";
// import MapContext from "../MapContext";
import GeoTIFF from 'ol/source/GeoTIFF';

const GeoTIFFSource = ({ sources, normalize=false, convertToRGB=false, opaque=0, transition=250, wrapX=false, interpolate=true }) => {
    let source = new GeoTIFF({
      sources,
      // Optional
      normalize,
      convertToRGB,
      opaque,
      transition,
      wrapX,
      interpolate
    });
    return source
}

export default GeoTIFFSource;