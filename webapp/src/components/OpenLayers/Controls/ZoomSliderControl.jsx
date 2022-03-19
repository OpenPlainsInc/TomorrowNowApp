/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/OpenLayers/Controls/ZoomSliderControl.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Saturday, March 19th 2022, 7:30:12 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */


import React, { useContext, useEffect, useState } from "react";
import ZoomSlider from 'ol/control/ZoomSlider';
import MapContext from "../MapContext";
const ZoomSliderControl = () => {
  const { map } = useContext(MapContext);
  useEffect(() => {
    if (!map) return;
    let zoomSliderControl = new ZoomSlider({});
    map.controls.push(zoomSliderControl);
    
    return () => map.controls.remove(zoomSliderControl);
  }, [map]);
  return null;
};
export default ZoomSliderControl;