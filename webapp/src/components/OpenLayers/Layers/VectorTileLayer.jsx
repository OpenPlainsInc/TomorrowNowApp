/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/OpenLayers/Layers/VectorTileLayer.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Tuesday, May 10th 2022, 2:59:35 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */
import React, { useContext, useEffect, useState } from "react";
import MapContext from "../MapContext";
import OLVectorTileLayer from 'ol/layer/VectorTile';

export const VectorTileLayer = ({source, layerName, zIndex = 0, ...props}) => {
    const { map } = useContext(MapContext);
    const [layer, setLayer] = useState(null)

    useEffect(() => {
      if (!map) return;
      let vectorTileLayer = new OLVectorTileLayer({
        ...props,
        source
      });
      
      map.addLayer(vectorTileLayer);
      vectorTileLayer.setZIndex(zIndex);
      vectorTileLayer.set('name', layerName)
      setLayer(vectorTileLayer)
     
    
      return () => { 
        if (map) {
          map.removeLayer(vectorTileLayer);
          setLayer(null)
        }
      };
    }, [map, source]);
  
    useEffect(() => {
    //   if (!source || !layer || !style) return;
    //     layer.setStyle(style)
    }, [source, layer])
    return null;

}

