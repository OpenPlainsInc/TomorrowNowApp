import { useContext, useEffect, useState } from "react";
import MapContext from "../MapContext";
import OLWebGLTileLayer from 'ol/layer/WebGLTile';
// import { Layer } from "ol/layer";
import filters from "../Filters"

const WebGLTileLayer = ({ 
  layerName, 
  source, 
  style = undefined,
  exposure = 0, 
  contrast = 0, 
  saturation = 0, 
  gamma = 1, 
  color = undefined,
  minZoom = undefined,
  maxZoom = undefined,
  opacity = 1, 
  zIndex = 1,
  onPostRender = null,
  ...props
}) => {
  const { map } = useContext(MapContext); 
  const [layer, setLayer] = useState(null)

  // const onPostRender = (e) => {
  //   console.log(e)
  //   let kernel = filters.kernels.sharpen
  //   let selectedKernel = filters.normalize(kernel)
  //   // filters.convolve(e, selectedKernel)
  //   filters.convolve(e, selectedKernel)

  // }

  const onPointerMove = e => {
    const data = layer.getData(e.pixel)
    if (!data) return;
    console.log("WebGLLayer: Data", data[0]);
    // console.log("WebGLLayer: Props", layer.getData())
  }

  useEffect(() => {
    if (!map || !source) return;
    
    let tileLayer = new OLWebGLTileLayer({
      ...props,
      source,
      style,
      zIndex,
      opacity
    });
    console.log("WebGLTileLayer", tileLayer)
    map.setView(source.getView()) // Need to figure out what to do about this with mismatched projetions
    map.addLayer(tileLayer);
    tileLayer.setZIndex(zIndex);
    tileLayer.set('name', layerName)
    
    setLayer(tileLayer)
    return () => {
      if (map) {
        map.un('pointermove', onPointerMove)
        map.removeLayer(tileLayer);
       
      }
    };
  }, [map, source, style, zIndex]);

  useEffect(()=>{
    if (!layer) return;
    layer.setOpacity(opacity)
  },[layer, opacity])

  useEffect(()=> {
    if (!layer || !color) return;
      console.log("Style Change", {color, exposure, contrast, saturation, gamma })
      layer.updateStyleVariables({color, exposure, contrast, saturation, gamma });

  }, [layer, exposure, contrast, saturation, gamma, color])

  useEffect(()=> {
    if (!map || !layer) return;
    if (onPostRender) {
      layer.on('postrender', onPostRender)
    }
    
    map.on('pointermove', onPointerMove)
    return () => {
      if (layer) {
        if (onPostRender) {
          layer.un('postrender', onPostRender)
        }
      }
    };
  }, [map, layer])

  // Set MinZoom
  useEffect(() => {
    if (!layer || !minZoom) return;
      layer.setMinZoom(minZoom)
  }, [layer, minZoom])

  // Set MaxZoom
  useEffect(() => {
    if (!layer || !maxZoom) return;
      layer.setMaxZoom(maxZoom)
  }, [layer, maxZoom])

  return null;
};
export default WebGLTileLayer;