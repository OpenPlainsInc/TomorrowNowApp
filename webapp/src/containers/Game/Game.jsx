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
import XYZ from 'ol/source/XYZ';
import TileWMS from 'ol/source/TileWMS';
import nlcdSource from '../../components/OpenLayers/Sources/nlcd';
import ned3DepSource from '../../components/OpenLayers/Sources/ned3dep';
import naipSource from '../../components/OpenLayers/Sources/naip';
import nhdPlusSource from '../../components/OpenLayers/Sources/nhdPlus'
import ImageArcGISRest from 'ol/source/ImageArcGISRest';
import {Image as ImageLayer} from 'ol/layer';
const Game = ({ children, zoom, center }) => {
    
    const [map, setMap] = useState(null)
    const mapElement = useRef()

    useEffect(() => {
        

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
       
        const tileJson = {
          "tilejson": "2.2.0",
          "version": "1.0.0",
          "scheme": "xyz",
          "tiles": [
            "http://localhost:7000/cog/tiles/WebMercatorQuad/{z}/{x}/{y}@1x.webp?url=https%3A%2F%2Fstorage.googleapis.com%2Ftomorrownow-actinia-dev%2Fdem_10m_mosaic_cog.tif&bidx=1&expression=b1%2Fb2&unscale=false&resampling=bilinear&rescale=0%2C2000&rescale=0%2C1000&rescale=0%2C10000&colormap_name=terrain&return_mask=true"
          ],
          "minzoom": 8,
          "maxzoom": 14,
          "bounds": [
            -80.13177442636383,
            35.462158792878206,
            -78.26815748980388,
            36.55237003528649
          ],
          "center": [
            -79.19996595808385,
            36.00726441408235,
            8
          ]
        }

        const xyzLayer = new TileLayer({
          source: new XYZ({
            // url: "http://localhost:7000/cog/tiles/WebMercatorQuad/{z}/{x}/{y}@1x.png?url=https%3A%2F%2Fstorage.googleapis.com%2Ftomorrownow-actinia-dev%2Fdem_10m_mosaic_cog.tif&bidx=1&expression=b1%2Fb2&unscale=false&resampling=bilinear&rescale=0%2C2000&rescale=0%2C1000&rescale=0%2C10000&colormap_name=terrain&return_mask=true",
            url: 'http://localhost:7000/cog/tiles/{z}/{x}/{y}?scale=1&TileMatrixSetId=WGS1984Quad&url=https%3A%2F%2Fstorage.googleapis.com%2Ftomorrownow-actinia-dev%2Felevation.tif&bidx=1&unscale=false&resampling=bilinear&rescale=0%2C2000&rescale=0%2C1000&rescale=0%2C10000&return_mask=true'

          }),
        })
    
        const osm = new TileLayer({
          source: new OSM(),
          opacity: 0.5
        });

        const depLayer =  new TileLayer({
          // extent: [-13884991, 2870341, -7455066, 6338219],
            source: ned3DepSource({layer: 'Hillshade Elevation Gray'}),
            opacity: 0.4
        })

       const nlcdLayer =  new TileLayer({
          // extent: [-13884991, 2870341, -7455066, 6338219],
            source: nlcdSource(),
            opacity: 0.4 // Opac
        })

        const naipLayer =  new TileLayer({
          // extent: [-13884991, 2870341, -7455066, 6338219],
            source: naipSource(),
            opacity: 1.0 //Full color
        })

        // Server was down giving a 500 error
        const nhdPlusLayer =  new TileLayer({
            source: nhdPlusSource(),
            // opacity: 1.0
        })

        // const nhdPlusLayer = new ImageLayer({
        //   source: new ImageArcGISRest({
        //     ratio: 1,
        //     params: {},
        //     url: 'https://hydro.nationalmap.gov/arcgis/rest/services/NHDPlus_HR/MapServer',
        //   }),
        // })

        // Also down... https://hydrowfs.nationalmap.gov/arcgis/rest/services/wbd/MapServer
        // const hydroUnitLayer = new TileLayer({
        //   source: new XYZ({
        //     attributions:
        //       'Tiles © <a href="https://hydrowfs.nationalmap.gov/arcgis/rest/services/wbd/MapServer">National Map</a>',
        //     url:
        //       'https://hydrowfs.nationalmap.gov/arcgis/rest/services/' +
        //       'wbd/MapServer/tile/{z}/{y}/{x}',
        //   }),
        //   opacity: 1.0

        // });

      
        
        

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
        // const grassLayer = new WebGLTileLayer({
        //   style: falseColor,
        //   source: new GeoTIFF({
        //     normalize: false,
        //     sources: [
        //       // {
        //       //   url: 'https://storage.googleapis.com/storage/v1/b/tomorrownow-actinia-dev/o/boundary_county_500m.tif'
        //       // },
        //       // {
        //       //   url: 'https://storage.googleapis.com/download/storage/v1/b/tomorrownow-actinia-dev/o/dem_10m_mosaic_cog.tif?alt=media'
        //       // }
        //       // {
        //       //   url: 'https://tomorrownow-actinia-dev.storage.googleapis.com/boundary_county_500m.tif'
        //       // },
        //       // {
        //       //   url: 'https://storage.googleapis.com/tomorrownow-actinia-dev/boundary_county_500m.tif'
        //       // },
        //     ],
        //   }),
        // });

        const initialMap = new Map({
            target: mapElement.current,
            layers: [
            //  watercolor,
            //  terrain,
              // nhdPlusLayer,
              nlcdLayer,
              // naipLayer,
              depLayer,
              osm,
              // hydroUnitLayer
            // grassLayer,
              // xyzLayer
            ],
            view: new View({
              projection: 'EPSG:4326', // 4326 //EPSG:3857
              center: [-78.6802,35.8408],
              // extent: [
              //   -80.13177442636383,
              //   35.462158792878206,
              //   -78.26815748980388,
              //   36.55237003528649
              // ],
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