/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/OpenLayers/Overlays/AnimatedCanvasOverlay.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Saturday, May 7th 2022, 5:23:34 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */


import { useContext, useEffect, useState } from "react";
import MapContext from "../MapContext";
import AnimatedCanvas from "ol-ext/overlay/AnimatedCanvas";
// import Rain  from "ol-ext/particule/Rain"
// import Cloud from "ol-ext/particule/Cloud"

/**
 * 
 * @param {acanvas} object animatedCanvas 
 * @param {visible} boolean Set Visibilty
 * @returns 
 */

export const AnimatedCanvasOverlay = ({acanvas, visible=false}) => {
  const { map } = useContext(MapContext); 
  const [overlay, setOverlay] = useState(null)
  
  
  useEffect(() => {
    if (!map || !acanvas) return;
    // https://github.com/Viglino/ol-ext/blob/master/examples/misc/map.animatedcanvas.html
    const animatedOverlay = new AnimatedCanvas(acanvas)

    // animatedOverlay.setVisible(visible);
    setOverlay(animatedOverlay)
    // animatedOverlay.setMap(map)
    map.addOverlay(animatedOverlay);

    return () => {
      if (map) {
        map.removeOverlay(animatedOverlay);
      }
    };
  }, [map, acanvas]);

  useEffect(()=>{
    if (!overlay) return;
    overlay.setVisible(visible);
  },[visible, overlay])

  return null;
};
