/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/OpenLayers/Controls/ImageLegendControl.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Monday, February 27th 2023, 11:58:03 pm
 * Author: Corey White
 * 
 * Copyright (c) 2023 Corey White
 */


import { useContext, useEffect } from "react";
import OLLegend from "ol-ext/control/Legend";
import MapContext from "../MapContext";
const LegendControl = () => {
  const { map } = useContext(MapContext);
  useEffect(() => {
    if (!map) return;
    let legend = new OLLegend({});
    map.controls.push(legend);
    
    return () => map.controls.remove(legend);
  }, [map]);
  return null;
};
export default LegendControl;