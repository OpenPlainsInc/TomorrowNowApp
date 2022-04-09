import React, { useRef, useState, useEffect } from "react"
import "./Map.scss";
import MapContext from "./MapContext";
import * as ol from "ol";



const Map = ({ children, zoom, center, projection='EPSG:3857', mapClass="ol-map", altView=null}) => {
  const mapRef = useRef();
  const [map, setMap] = useState(null);

  // const events = {
  //   'change': undefined,
  //   'change:layerGroup': undefined,
  //   'change:size': undefined,
  //   'change:target': undefined,
  //   'change:view': undefined,
  //   'click': undefined,
  //   'dblclick': undefined,
  //   'moveend': undefined,
  //   'pointerdrag': undefined,
  //   'pointermove': undefined,
  //   'postcompose': undefined,
  //   'postrender': undefined,
  //   'precompose': undefined,
  //   'propertychange': undefined,
  //   'singleclick': undefined
  // };

 
  // on component mount
  useEffect(() => {
    let view = new ol.View({ 
      zoom, 
      center,
      projection 
    })
  
    let options = {
      layers: [],
      controls: [],
      overlays: [],
      view: view
    };
    let mapObject = new ol.Map(options);
    mapObject.setTarget(mapRef.current);
    setMap(mapObject);
   
    return () => mapObject.setTarget(undefined);
  },[]);

  // view change handler
  useEffect(() => {
    if (!map && !altView){
      return
    } else {
      map.setView(altView.getView())
      console.log("altView", altView)
      console.log("map + view", map.getView())
    }
   
  }, [altView]);
  // zoom change handler
  useEffect(() => {
    if (!map) return;
    map.getView().setZoom(zoom);
  }, [zoom]);
  // center change handler
  useEffect(() => {
    if (!map) return;
    map.getView().setCenter(center)
  }, [center])
  return (
    <MapContext.Provider value={{ map }}>
      <div ref={mapRef} className={mapClass}>
        {children}
      </div>
    </MapContext.Provider>
  )
}
export default Map;