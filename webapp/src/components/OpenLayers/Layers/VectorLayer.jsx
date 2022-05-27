import { useContext, useEffect, useState } from "react";
import MapContext from "../MapContext";
import OLVectorLayer from "ol/layer/Vector";


const VectorLayer = ({ layerName, source, style, zIndex = 0, handleClickEvent=null }) => {
  const { map } = useContext(MapContext);
  const [layer, setLayer] = useState(null)

  useEffect(() => {
    if (!map) return;
    let vectorLayer = new OLVectorLayer({
      source,
      style
    });
    
    map.addLayer(vectorLayer);
    vectorLayer.setZIndex(zIndex);
    vectorLayer.set('name', layerName)
    setLayer(vectorLayer)
    if (handleClickEvent){
      map.on('click', handleClickEvent)
    }
  
    return () => { 
      if (map) {
        if (handleClickEvent){
          map.un('click',handleClickEvent)
        }
       
        map.removeLayer(vectorLayer);
        setLayer(null)
      }
    };
  }, [map, source, style, zIndex]);

  useEffect(() => {
    if (!source || !layer || !style) return;
      layer.setStyle(style)
  }, [source, layer, style])
  return null;
};
export default VectorLayer;