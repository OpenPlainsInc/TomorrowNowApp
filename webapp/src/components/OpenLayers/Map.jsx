import React, { useRef, useState, useEffect } from "react"
import "./Map.scss";
import MapContext from "./MapContext";
import {
  Map as OLMap,
  View as OLView 
} from "ol"



const Map = ({ children, zoom, center, projection='EPSG:3857', extent=undefined, mapClass="ol-map", altView=null, triggerExternalLayerRender=null}) => {
  const mapRef = useRef();
  const [map, setMap] = useState(null);
 
  // on component mount
  useEffect(() => {
    if (!center || !zoom || !projection) return;
    let view = new OLView({ 
      zoom, 
      center,
      projection,
      extent 
    })
  
    let options = {
      layers: [],
      controls: [],
      overlays: [],
      view: view
    };

    let mapObject = new OLMap(options);
    mapObject.setTarget(mapRef.current);
    setMap(mapObject);
   
    return () => mapObject.setTarget(undefined);
  },[center, zoom, projection]);

  // view change handler
  useEffect(() => {
    if (!map || !altView) return;
    map.setView(altView.getView())
    console.log("altView", altView)
    console.log("map + view", map.getView())
  }, [map, altView]);

  // zoom change handler
  useEffect(() => {
    if (!map) return;
    map.getView().setZoom(zoom);
  }, [map, zoom]);

  // center change handler
  useEffect(() => {
    if (!map) return;
    map.getView().setCenter(center)
  }, [map, center])

  if (triggerExternalLayerRender && map){
    triggerExternalLayerRender(map)
  }
 

  return (
    <MapContext.Provider value={{ map }}>
      <div ref={mapRef} className={mapClass}>
        {children}
      </div>
    </MapContext.Provider>
  )
}
export default Map;