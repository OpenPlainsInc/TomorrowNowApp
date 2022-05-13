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
    // map.setView(source.getView()) // Need to figure out what to do about this with mismatched projetions
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
  }, [map, source, style, zIndex = 0]);

  useEffect(()=>{
    if (!map || !layer) return;
    layer.setOpacity(opacity)
  },[opacity])

  useEffect(()=> {
    if (!map || !source || !style || !layer || !color) return;
      console.log("Style Change", {color, exposure, contrast, saturation, gamma })
      layer.updateStyleVariables({color, exposure, contrast, saturation, gamma });

  }, [layer, exposure, contrast, saturation, gamma, color])

  useEffect(()=> {
    if (!map || !layer) return;
    if (onPostRender) {
      layer.on('postrender', onPostRender)
    }
    
    layer.on('postcompose', onPostRender)
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
    if (!source || !layer || !minZoom) return;
      layer.setMinZoom(minZoom)
  }, [source, layer, minZoom])

  // Set MaxZoom
  useEffect(() => {
    if (!source || !layer || !maxZoom) return;
      console.log(`Current max zoom: ${layer.getMaxZoom()}, new max zoom ${maxZoom}`)
      layer.setMaxZoom(maxZoom)
  }, [source, layer, maxZoom])

  return null;
};
export default WebGLTileLayer;