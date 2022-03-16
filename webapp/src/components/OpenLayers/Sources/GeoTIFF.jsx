import { useContext, useEffect } from "react";
import MapContext from "../MapContext";
import GeoTIFF from 'ol/source/GeoTIFF';
const GeoTIFFSource = ({ sources, normalize=false, convertToRGB=false, opaque=0, transition=250, wrapX=false, interpolate=true }) => {
  const { map } = useContext(MapContext); 
  useEffect(() => {
    if (!map) return;
    
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
    // let layer = map.getLayers().getArray().find(layer => layer.get('name') == layerName);
    // layer.setSource(source)
    return () => {
      if (map) {
        // layer.setSource(null);
      }
    };
  }, [map]);
  return null;
};
export default GeoTIFFSource;