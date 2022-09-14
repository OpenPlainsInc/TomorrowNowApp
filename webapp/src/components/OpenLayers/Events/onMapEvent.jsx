/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/OpenLayers/Events/onMapEvent.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Monday, April 11th 2022, 2:13:04 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */


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


const OnMapEvent = ({eventName, eventHandler}) => {
  const { map } = useContext(MapContext); 

  const _isValidEvent = (eventName) => {
    const defaultEvents = [
        'change',
        'change:layerGroup',
        'change:size',
        'change:target',
        'change:view',
        'click',
        'dblclick',
        'moveend',
        'pointerdrag',
        'pointermove',
        'postcompose',
        'postrender',
        'precompose',
        'propertychange',
        'singleclick'
    ];

    return defaultEvents.includes(eventName)


}

  useEffect(() => {
    if (!map) return;
    if (!_isValidEvent(eventName)) {
        console.warn(`Provided map event name "${eventName}" is not a default map event`);
    }
    map.on(eventName, eventHandler)
    return () => {
      if (map) {
        map.un(eventName, eventHandler)
      }
    }
  }, [map, eventName, eventHandler]);
  return null;
};
export default OnMapEvent;