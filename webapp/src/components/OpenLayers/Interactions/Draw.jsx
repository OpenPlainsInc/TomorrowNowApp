/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/OpenLayers/Interactions/Draw.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Monday, April 25th 2022, 5:03:12 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */


import { useContext, useEffect } from "react";
import MapContext from "../MapContext";
import OLTileLayer from "ol/layer/Tile";
import OLDraw from 'ol/interaction/Draw';

const Draw = ({ source, features=undefined, type="Point", ...props }) => {
  const { map } = useContext(MapContext); 
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
    
    let draw = new OLDraw({
      ...props,
      source,
      type,
    });
    map.addInteraction(draw);
   
    return () => {
      if (map) {
        map.removeInteraction(draw);
      }
    };
  }, [map]);
  return null;
};
export default Draw;