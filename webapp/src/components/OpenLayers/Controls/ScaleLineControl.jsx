/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/OpenLayers/Controls/ScaleLine.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Thursday, March 31st 2022, 1:07:14 am
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */


import { useContext, useEffect } from "react";
import ScaleLine from 'ol/control/ScaleLine';
import MapContext from "../MapContext";
const ScaleLineControl = () => {
  const { map } = useContext(MapContext);
  useEffect(() => {
    if (!map) return;
    let scaleLineControl = new ScaleLine({});
    map.controls.push(scaleLineControl);
    
    return () => map.controls.remove(scaleLineControl);
  }, [map]);
  return null;
};
export default ScaleLineControl;