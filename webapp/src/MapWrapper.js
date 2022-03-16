// react
import React, { useState, useEffect, useRef } from 'react';
import "./MapWrapper.css";
import 'ol/ol.css';

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


// Styles for the mapbox-streets-v6 vector tile data set. Loosely based on
// http://a.tiles.mapbox.com/v4/mapbox.mapbox-streets-v6.json


// const MAPBOX = "pk.eyJ1IjoiY3R3aGl0ZSIsImEiOiJjbDBvbTFhNjkxcnJyM2luNXlkOGo3bjExIn0.z6mg-Hr39KpxI42WqcmwMg"

function MapWrapper(props) {
  
  // set intial state
  const [ map, setMap ] = useState()
  const [ featuresLayer, setFeaturesLayer ] = useState()
  const [ selectedCoord , setSelectedCoord ] = useState()

  // pull refs
  const mapElement = useRef()
  
  // create state ref that can be accessed in OpenLayers onclick callback function
  //  https://stackoverflow.com/a/60643670
  const mapRef = useRef()
  mapRef.current = map

  // initialize map on first render - logic formerly put into componentDidMount
  useEffect( () => {

    // create and add vector source layer
    const initalFeaturesLayer = new VectorLayer({
      source: new VectorSource()
    })

    const osm = new TileLayer({
      source: new OSM(),
    });

   
    // const terrain =  new TileLayer({
    //   source: new Stamen({
    //     layer: 'terrain-labels',
    //   }),
    // })

    // create map
    const initialMap = new Map({
      target: mapElement.current,
      layers: [
        // https://openlayers.org/en/latest/examples/ogc-map-tiles.html
        new TileLayer({
          source: new OGCMapTile({
            url: 'https://maps.ecere.com/ogcapi/collections/blueMarble/map/tiles/WebMercatorQuad',
          }),
        }),
       osm,
        // new VectorTileLayer({
        //   declutter: true,
        //   source: new VectorTileSource({
        //     attributions: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> ' +
        //       '© <a href="https://www.openstreetmap.org/copyright">' +
        //       'OpenStreetMap contributors</a>',
        //     format: new MVT(),
        //     url: 'https://{a-d}.tiles.mapbox.com/v4/mapbox.mapbox-streets-v8/' +
        //         '{z}/{x}/{y}.vector.pbf?access_token=' + MAPBOX
        //   }),
        //   style: createMapboxStreetsV6Style(Style, Fill, Stroke, Icon, Text)
        // }),
        // osm,
        initalFeaturesLayer
        
      ],
      view: new View({
        projection: 'EPSG:4326', // 4326
        center: [0, 0],
        zoom: 2
      }),
      controls: []
    })

    // set map onclick handler
    initialMap.on('click', handleMapClick)

    // save map and vector layer references to state
    console.log("initialMap", initialMap)
    setMap(initialMap)
    console.log("initalFeaturesLayer", initalFeaturesLayer)

    setFeaturesLayer(initalFeaturesLayer)

  },[])

  // update map if features prop changes - logic formerly put into componentDidUpdate
  useEffect( () => {
    console.log("use effect:", props, props.features)
    console.log("use featuresLayer:", featuresLayer)

    if (props.features !== undefined && featuresLayer !== undefined && map !== undefined) { // may be null on first render
        console.log("use effect: True", props.features)
        let features = new GeoJSON().readFeatures(props.features)
      // set features to map
      // console.log("Map2", map);
      featuresLayer.setSource(
        new VectorSource({
          features: features // make sure features is an array
        })
      )

      // // fit map to feature extent (with 100px of padding)
      map.getView().fit(featuresLayer.getSource().getExtent(), map.getSize(), {
       padding: [100,100,100,100]
      })

    }

  },[props.features, map, featuresLayer])

  // map click handler
  const handleMapClick = (event) => {

    // get clicked coordinate using mapRef to access current React state inside OpenLayers callback
    //  https://stackoverflow.com/a/60643670
    const clickedCoord = mapRef.current.getCoordinateFromPixel(event.pixel);

    // transform coord to EPSG 4326 standard Lat Long
    const transormedCoord = transform(clickedCoord, 'EPSG:3857', 'EPSG:4326')

    // set React state
    setSelectedCoord( transormedCoord )

    console.log(transormedCoord)
    
  }

  // render component
  return (      
    <div ref={mapElement} className="map-container"></div>
  ) 

}

export default MapWrapper