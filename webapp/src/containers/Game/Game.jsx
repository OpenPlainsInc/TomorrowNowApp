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
import MapContext from '../../components/OpenLayers/MapContext'
import MapEditer from '../../components/OpenLayers/MapEditer';


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
          source: new GeoTIFF({
            normalize: false,
            sources: [
              // {
              //   url: 'https://storage.googleapis.com/storage/v1/b/tomorrownow-actinia-dev/o/boundary_county_500m.tif'
              // },
              // {
              //   url: 'https://storage.googleapis.com/download/storage/v1/b/tomorrownow-actinia-dev/o/dem_10m_mosaic_cog.tif?alt=media'
              // }
              // {
              //   url: 'https://tomorrownow-actinia-dev.storage.googleapis.com/boundary_county_500m.tif'
              // },
              // {
              //   url: 'https://storage.googleapis.com/tomorrownow-actinia-dev/boundary_county_500m.tif'
              // },
            ],
          }),
        });

        const initialMap = new Map({
            target: mapElement.current,
            layers: [
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