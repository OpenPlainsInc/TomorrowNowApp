/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/OpenLayers/Layers/GraticuleLayer.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Saturday, April 9th 2022, 3:50:22 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */


import { useContext, useEffect } from "react";
import MapContext from "../MapContext";
import OLGraticule from 'ol/layer/Graticule';
import Stroke from 'ol/style/Stroke';


const GraticuleLayer = ({ color, showLables=true, zIndex = 0}) => {
  const { map } = useContext(MapContext); 
  useEffect(() => {
    if (!map) return;
    
    let graticule = new OLGraticule({
        strokeStyle: new Stroke({
            color: 'rgba(255,120,0,0.9)',
            width: 2,
            lineDash: [0.5, 4],
          }),
        showLabels: true,
        visible: true,
        wrapX: false,
    });
    map.addLayer(graticule);
    graticule.setZIndex(zIndex);
    return () => {
      if (map) {
        map.removeLayer(graticule);
      }
    };
  }, [map]);
  return null;
};
export default GraticuleLayer;