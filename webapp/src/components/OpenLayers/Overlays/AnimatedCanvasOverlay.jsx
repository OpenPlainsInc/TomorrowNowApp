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
import Rain  from "ol-ext/particule/Rain"
import Cloud from "ol-ext/particule/Cloud"

const AnimatedCanvasOverlay = ({acanvas, visible}) => {
  const { map } = useContext(MapContext); 
  const [overlay, setOverlay] = useState(null)
  const [animatedOverlayOptions, setAnimatedOverlayOptions] = useState(null)

  
  // https://github.com/Viglino/ol-ext/blob/master/examples/misc/map.animatedcanvas.html
  

  useEffect(()=> {
    if (!acanvas) return

    const clouds = {
      particule: Cloud,
      density: 2,
      angle: Math.PI/3,
      speed: 2
    }
  
    const rain = {
      particule: Rain,
      density: 1,
      angle: 2 * Math.PI / 5,
      speed: 5
    };

    if (acanvas === 'Rain') {
      setAnimatedOverlayOptions(rain)
    }
  
    if (acanvas === 'Clouds') {
      setAnimatedOverlayOptions(clouds)
    }

  }, [acanvas])

  useEffect(() => {
    if (!map) return;
    if (!animatedOverlayOptions) return;

    const animatedOverlay = new AnimatedCanvas(animatedOverlayOptions)

    animatedOverlay.setVisible(visible);
    map.addOverlay(animatedOverlay);
    setOverlay(animatedOverlay)

    return () => {
      map.removeOverlay(animatedOverlay);
      setOverlay(null)
    };
  }, [map, animatedOverlayOptions]);

  useEffect(()=>{
    if (!map || !overlay) return;
    overlay.setVisible(visible);
  },[visible, overlay])

  return null;
};
export default AnimatedCanvasOverlay;