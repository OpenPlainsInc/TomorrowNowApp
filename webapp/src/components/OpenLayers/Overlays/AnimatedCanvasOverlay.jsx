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
import AnimatedCanvas from "ol-ext/overlay/AnimatedCanvas"
import Rain from "ol-ext/particule/Rain"

const AnimatedCanvasOverlay = ({visible}) => {
  const { map } = useContext(MapContext); 
  const [overlay, setOverlay] = useState(null)


  useEffect(() => {
    if (!map) return;

    // Rain
  const animatedOverlay = new AnimatedCanvas({
    particule: Rain,
    density: 1,
    angle: 2 * Math.PI / 5,
    speed: 5
  });
  animatedOverlay.setVisible(visible);
  map.addOverlay(animatedOverlay);
  setOverlay(animatedOverlay)

    return () => {
      if (map) {
        map.removeOverlay(animatedOverlay);
      }
    };
  }, [map]);

  useEffect(()=>{
    if (!map || !overlay) return;
    overlay.setVisible(visible);
  },[visible, overlay])

  return null;
};
export default AnimatedCanvasOverlay;