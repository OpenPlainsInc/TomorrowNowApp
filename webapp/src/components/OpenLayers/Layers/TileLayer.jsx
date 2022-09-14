import { useContext, useEffect, useCallback } from "react";
import MapContext from "../MapContext";
import OLTileLayer from "ol/layer/Tile";

const TileLayer = ({ source, layerName=undefined, opacity=1.0, zIndex = 0, visible=true, extent=undefined }) => {
  const { map } = useContext(MapContext); 
  useEffect(() => {
    if (!map) return;
    
    let tileLayer = new OLTileLayer({
      source,
      zIndex,
      opacity,
      visible,
      extent
    });
    map.addLayer(tileLayer);
    tileLayer.setZIndex(zIndex);
    tileLayer.set('name', layerName)

    return () => {
      if (map) {
        map.removeLayer(tileLayer);
      }
    };
  }, [map, extent,layerName,opacity,source,visible,zIndex]);
  return null;
};
export default TileLayer;