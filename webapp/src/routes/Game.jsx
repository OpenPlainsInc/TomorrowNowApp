// react
import React, { useState, useEffect, useRef } from 'react';
import 'ol/ol.css';
import './game.scss';
// openlayers
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import Stamen from 'ol/source/Stamen';



import {OSM, Vector as VectorSource} from 'ol/source';
import MapContext from '../components/MapContext';
import MapEditer from '../components/MapEditer';


const Game = ({ children, zoom, center }) => {
    
    const [map, setMap] = useState(null)
    const [drawSource, setDrawSource] = useState(null)
    const mapElement = useRef()

    useEffect(() => {
        const osm = new TileLayer({
            source: new OSM(),
        });

        const watercolor =  new TileLayer({
            source: new Stamen({
            layer: 'watercolor',
            }),
        })
    
        const terrain =  new TileLayer({
            source: new Stamen({
            layer: 'terrain-labels',
            })
        })

        const initialMap = new Map({
            target: mapElement.current,
            layers: [
              // https://openlayers.org/en/latest/examples/ogc-map-tiles.html
             watercolor,
             terrain
            ],
            view: new View({
              projection: 'EPSG:4326', // 4326 //EPSG:3857
              center: [-78.6802,35.8408],
              zoom: 11
            }),
            controls: []
          })

          // save map and vector layer references to state
          console.log("initialMap", initialMap)
          setMap(initialMap)
         
      }, [])
  
        return (
        <MapContext.Provider value={{map}}>
         <div ref={mapElement} className="map-fullscreen">
             <MapEditer drawTypes={['Point','Polygon','Circle']}></MapEditer>
         </div>
         </MapContext.Provider>
        )
 
  }


export default Game