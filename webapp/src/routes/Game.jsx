// react
import React, { useState, useEffect, useRef } from 'react';
import 'ol/ol.css';
import './game.scss';
// openlayers
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import Stamen from 'ol/source/Stamen';
import OSM from 'ol/source/OSM'
import GeoTIFF from 'ol/source/GeoTIFF';
import WebGLTileLayer from 'ol/layer/WebGLTile';
import MapContext from '../components/MapContext';
import MapEditer from '../components/MapEditer';


const Game = ({ children, zoom, center }) => {
    
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

        const max = 3000;
        function normalize(value) {
          return ['/', value, max];
        }

        const red = normalize(['band', 1]);
        const green = normalize(['band', 2]);
        const blue = normalize(['band', 3]);
        const nir = normalize(['band', 4]);
        
        const trueColor = {
          color: ['array', red, green, blue, 1],
          gamma: 1.1,
        };

        const falseColor = {
          color: ['array', nir, red, green, 1],
          gamma: 1.1,
        };
        const grassLayer = new WebGLTileLayer({
          style: falseColor,
          // style: {
          //   variables: {
          //     red:2000,
          //     redMax:3000, 
          //     green:2000,
          //     greenMax:3000, 
          //     blue: 2000,
          //     blueMax:3000},
          //   color: [
          //     'array',
          //     ['/', ['band', ['var', 'red']], ['var', 'redMax']],
          //     ['/', ['band', ['var', 'green']], ['var', 'greenMax']],
          //     ['/', ['band', ['var', 'blue']], ['var', 'blueMax']],
          //     1,
          //   ],
          // },
          source: new GeoTIFF({
            normalize: false,
            sources: [
              {
                url: 'https://s2downloads.eox.at/demo/EOxCloudless/2020/rgbnir/s2cloudless2020-16bits_sinlge-file_z0-4.tif',
              },
            ],
          }),
        });

        const initialMap = new Map({
            target: mapElement.current,
            layers: [
              // https://openlayers.org/en/latest/examples/ogc-map-tiles.html
             watercolor,
             terrain,
            //  osm
            grassLayer
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