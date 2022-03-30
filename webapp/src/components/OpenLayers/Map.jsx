import React, { useRef, useState, useEffect } from "react"
import "./Map.scss";
import MapContext from "./MapContext";
import * as ol from "ol";



const Map = ({ children, zoom, center, projection='EPSG:4326', altView=null }) => {
  const mapRef = useRef();
  const [map, setMap] = useState(null);
  // on component mount
  useEffect(() => {
    let view = new ol.View({ 
      zoom, 
      center,
      projection // 4326 //EPSG:3857 
    })
  
    let options = {
      view: view,
      layers: [],
      controls: [],
      overlays: []
    };
    let mapObject = new ol.Map(options);
    mapObject.setTarget(mapRef.current);
    setMap(mapObject);
    return () => mapObject.setTarget(undefined);
  }, []);

  // view change handler
  useEffect(() => {
    if (!map && !altView){
      return
    } else {
      map.setView(altView.getView())
      map.getView().setZoom(9)
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
      <div ref={mapRef} className="ol-map">
        {children}
      </div>
    </MapContext.Provider>
  )
}
export default Map;