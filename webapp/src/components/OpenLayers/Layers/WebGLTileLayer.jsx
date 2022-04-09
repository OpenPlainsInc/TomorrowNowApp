import { useContext, useEffect, useState } from "react";
import MapContext from "../MapContext";
import OLWebGLTileLayer from 'ol/layer/WebGLTile';
// import { Layer } from "ol/layer";
import filters from "../Filters"

const WebGLTileLayer = ({ layerName, source, style, exposure, contrast, saturation, gamma, color,opacity=1, zIndex = 0 }) => {
  const { map } = useContext(MapContext); 
  const [layer, setLayer] = useState(null)

  const onPostRender = (e) => {
    console.log(e)
    let kernel = filters.kernels.sharpen
    let selectedKernel = filters.normalize(kernel)
    // filters.convolve(e, selectedKernel)
    filters.convolve(e, selectedKernel)

  }




  useEffect(() => {
    if (!map || !source) return;
    
    let tileLayer = new OLWebGLTileLayer({
      source,
      style,
      zIndex,
      opacity
    });
    map.setView(source.getView())
    map.addLayer(tileLayer);
    tileLayer.setZIndex(zIndex);
    tileLayer.set('name', layerName)
    
    setLayer(tileLayer)
    return () => {
      if (map) {
        map.removeLayer(tileLayer);
      }
    };
  }, [map, source, style, zIndex = 0]);

  useEffect(()=>{
    if (!map || !layer) return;
    layer.setOpacity(opacity)
  },[opacity])

  useEffect(()=> {
    if (!map || !source || !style || !layer || !color) return;
      console.log("Style Change", {color, exposure,contrast,saturation, gamma })
      layer.updateStyleVariables({color, exposure,contrast,saturation, gamma });

  }, [layer, exposure, contrast, saturation, gamma, color])

  useEffect(()=> {
    if (!layer) return;
    // layer.on('postrender', onPostRender)
    // layer.on('postcompose', onPostRender)

  }, [layer])

  return null;
};
export default WebGLTileLayer;