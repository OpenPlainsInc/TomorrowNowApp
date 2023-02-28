/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/OpenLayers/Controls/LayerSwitcherControl.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Monday, February 27th 2023, 9:18:37 pm
 * Author: Corey White
 * 
 * Copyright (c) 2023 Corey White
 */


import { useContext, useEffect } from "react";
import OLLayerSwitcher from "ol-ext/control/LayerSwitcher";
import MapContext from "../MapContext";
const LayerSwitcherControl = () => {
  const { map } = useContext(MapContext);
  useEffect(() => {
    if (!map) return;
    let layerSwitcherControl = new OLLayerSwitcher({});
    map.controls.push(layerSwitcherControl);
    
    return () => map.controls.remove(layerSwitcherControl);
  }, [map]);
  return null;
};
export default LayerSwitcherControl;