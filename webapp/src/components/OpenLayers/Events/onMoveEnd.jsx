/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/OpenLayers/Events/onMoveEnd.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Thursday, April 7th 2022, 3:39:23 am
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */


import { useContext, useEffect } from "react";
import MapContext from "../MapContext";
// import OLTileLayer from "ol/layer/Tile";

const OnMoveEnd = ({eventHandler}) => {
  const { map } = useContext(MapContext); 
  useEffect(() => {
    if (!map) return;
    map.on('moveend', eventHandler)
    return () => {
      if (map) {
        map.un('moveend', eventHandler)
      }
    };
  }, [map]);
  return null;
};
export default OnMoveEnd;