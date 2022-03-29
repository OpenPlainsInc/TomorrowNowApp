import { useContext, useEffect } from "react";
import MapContext from "../MapContext";
import OLWebGLTileLayer from 'ol/layer/WebGLTile';
const WebGLTileLayer = ({ layerName, source, style, zIndex = 0 }) => {
  const { map } = useContext(MapContext); 
  useEffect(() => {
    if (!map) return;
    
    let tileLayer = new OLWebGLTileLayer({
      source,
      style,
      zIndex,
    });
    map.addLayer(tileLayer);
    tileLayer.setZIndex(zIndex);
    tileLayer.set('name', layerName)
    return () => {
      if (map) {
        map.removeLayer(tileLayer);
      }
    };
  }, [map, source, style, zIndex = 0]);
  return null;
};
export default WebGLTileLayer;