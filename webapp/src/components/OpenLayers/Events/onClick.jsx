/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/OpenLayers/Events/onClick.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Wednesday, April 6th 2022, 7:37:49 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */


import { useContext, useEffect } from "react";
import MapContext from "../MapContext";
// import OLTileLayer from "ol/layer/Tile";

const OnClick = ({eventHandler}) => {
  const { map } = useContext(MapContext); 
  useEffect(() => {
    if (!map) return;
    // eventHandler.bind(map)
    map.on('click', eventHandler)
    return () => {
      if (map) {
        map.un('click', eventHandler);
      }
    };
  }, [map]);
  return null;
};
export default OnClick;