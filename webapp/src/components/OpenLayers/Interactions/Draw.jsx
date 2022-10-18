/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/OpenLayers/Interactions/Draw.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Monday, April 25th 2022, 5:03:12 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */


import { useContext, useEffect, useState } from "react";
import MapContext from "../MapContext";
import OLTileLayer from "ol/layer/Tile";
import OLDraw from 'ol/interaction/Draw';

const Draw = ({ source, features=undefined, type="Point", isActive=false, ...props }) => {



  const { map } = useContext(MapContext); 
  let draw = new OLDraw({
    ...props,
    source,
    features,
    type,
  });
  const [drawInteraction, setDrawInteraction] = useState(draw)
  const DRAW_TYPES = [
      "Point", 
      "LineString", 
      "LinearRing", 
      "Polygon", 
      "MultiPoint", 
      "MultiLineString",
      "MultiPolygon",
      "GeometryCollection",
      "Circle"
    ]

 
  useEffect(() => {
    if (!map) return;
    map.addInteraction(drawInteraction);
    
    return () => {
      if (map) {
        map.removeInteraction(draw);
      }
    };
  }, [map]);


  useEffect(()=> {
    const updateActive = (active) => {
      if(!drawInteraction) return;
      drawInteraction.setActive(active)
    } 
    updateActive(isActive)
    // drawInteraction.setActive(isActive)
  }, [isActive,drawInteraction])

  return null;
};
export default Draw;