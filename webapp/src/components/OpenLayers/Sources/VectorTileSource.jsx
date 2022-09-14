/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/OpenLayers/Sources/VectorTileSource.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Tuesday, May 10th 2022, 2:50:12 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */
import OLVectorTile from "ol/source/VectorTile";
import OLMVT from 'ol/format/MVT';
import OLWMTS from 'ol/tilegrid/WMTS'
import Projection from "ol/proj/Projection";
import { useState, useEffect } from "react";


export const useVectorTileSource = ({layerName, baseUrl}) => {
  const [vectorSource, setVectorSource] = useState(null)
  useEffect(()=> {
    const gridsetName = 'EPSG:4326';
    const gridNames = ['EPSG:4326:0', 'EPSG:4326:1', 'EPSG:4326:2', 'EPSG:4326:3', 'EPSG:4326:4', 'EPSG:4326:5', 'EPSG:4326:6', 'EPSG:4326:7', 'EPSG:4326:8', 'EPSG:4326:9', 'EPSG:4326:10', 'EPSG:4326:11', 'EPSG:4326:12', 'EPSG:4326:13', 'EPSG:4326:14', 'EPSG:4326:15', 'EPSG:4326:16', 'EPSG:4326:17', 'EPSG:4326:18', 'EPSG:4326:19', 'EPSG:4326:20', 'EPSG:4326:21'];
    // const baseUrl = 'http://localhost:8600/geoserver/gwc/service/wmts';
    const style = '';
    const format = 'application/vnd.mapbox-vector-tile';
    const projection = new Projection({
      code: 'EPSG:4326',
      units: 'degrees',
      axisOrientation: 'neu'
      });
    const resolutions = [0.703125, 0.3515625, 0.17578125, 0.087890625, 0.0439453125, 0.02197265625, 0.010986328125, 0.0054931640625, 0.00274658203125, 0.001373291015625, 6.866455078125E-4, 3.4332275390625E-4, 1.71661376953125E-4, 8.58306884765625E-5, 4.291534423828125E-5, 2.1457672119140625E-5, 1.0728836059570312E-5, 5.364418029785156E-6, 2.682209014892578E-6, 1.341104507446289E-6, 6.705522537231445E-7, 3.3527612686157227E-7];
    let defaultParams = {
      'REQUEST': 'GetTile',
      'SERVICE': 'WMTS',
      'VERSION': '1.0.0',
      'LAYER': layerName,
      'STYLE': style,
      'TILEMATRIX': gridsetName + ':{z}',
      'TILEMATRIXSET': gridsetName,
      'FORMAT': format,
      'TILECOL': '{x}',
      'TILEROW': '{y}'
    };

    let _params = defaultParams;

    const constructSource = (baseUrl) => {
      let url = baseUrl+'?'
      for (var param in _params) {
        url = url + param + '=' + _params[param] + '&';
      }
      url = url.slice(0, -1);

      let source = new OLVectorTile({
        url: url,
        format: new OLMVT({}),
        projection: projection,
        tileGrid: new OLWMTS({
          tileSize: [256,256],
          origin: [-180.0, 90.0],
          resolutions: resolutions,
          matrixIds: gridNames
        }),
        wrapX: true
      });
      return source;
    }
    setVectorSource(constructSource(baseUrl)) 
  }, [layerName, baseUrl])
  return vectorSource
}