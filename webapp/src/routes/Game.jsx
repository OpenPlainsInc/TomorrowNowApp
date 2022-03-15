// react
import React, { useState, useEffect, useRef } from 'react';
import 'ol/ol.css';
import './game.scss';
// openlayers
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import Stamen from 'ol/source/Stamen';

import OGCMapTile from 'ol/source/OGCMapTile';

import VectorLayer from 'ol/layer/Vector'
import {OSM, Vector as VectorSource} from 'ol/source';

import MVT from 'ol/format/MVT.js';
import VectorTileLayer from 'ol/layer/VectorTile.js';
import VectorTileSource from 'ol/source/VectorTile.js';
import XYZ from 'ol/source/XYZ'
import GeoJSON from 'ol/format/GeoJSON';
import {Fill, Icon, Stroke, Style, Text} from 'ol/style.js';

import {transform, fromLonLat} from 'ol/proj'
import {toStringXY} from 'ol/coordinate';


const World = () => {

    const [map, setMap] = useState(null)
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
      
          // set map onclick handler
        //   initialMap.on('click', handleMapClick)
      
          // save map and vector layer references to state
          console.log("initialMap", initialMap)
          setMap(initialMap)



      }, [])
  
        return (
         <div ref={mapElement} className="map-fullscreen"></div>
        )
 
  }


export default World