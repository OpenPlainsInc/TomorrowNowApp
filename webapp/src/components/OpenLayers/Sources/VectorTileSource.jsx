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
import { createXYZ } from 'ol/tilegrid'
import OLWMTS from 'ol/tilegrid/WMTS'
import {Fill, Stroke, Style} from 'ol/style'
import Projection from "ol/proj/Projection";
import { WMTS } from "ol/source";

export const partiallyApply = (Component, partialProps) => {
    return props => {
        <Component {...partialProps} {...props} />
    }
}

const style_simple = new Style({
    fill: new Fill({
      color: '#ADD8E6'
    }),
    stroke: new Stroke({
      color: '#880000',
      width: 1
    })
  });

export const VectorTileSource = ({baseUrl, params = {}, ...props}) => {
    //https://openlayers.org/en/latest/examples/vector-tile-info.html
    // const gridNames = ['EPSG:4326:0', 'EPSG:4326:1', 'EPSG:4326:2', 'EPSG:4326:3', 'EPSG:4326:4', 'EPSG:4326:5', 'EPSG:4326:6', 'EPSG:4326:7', 'EPSG:4326:8', 'EPSG:4326:9', 'EPSG:4326:10', 'EPSG:4326:11', 'EPSG:4326:12', 'EPSG:4326:13', 'EPSG:4326:14', 'EPSG:4326:15', 'EPSG:4326:16', 'EPSG:4326:17', 'EPSG:4326:18', 'EPSG:4326:19', 'EPSG:4326:20', 'EPSG:4326:21'];
    // const gridsetName = 'EPSG:4326';
    // const format = 'application/vnd.mapbox-vector-tile';
    // const layerName = 'actinia:huc_12'
    // const resolutions = [0.703125, 0.3515625, 0.17578125, 0.087890625, 0.0439453125, 0.02197265625, 0.010986328125, 0.0054931640625, 0.00274658203125, 0.001373291015625, 6.866455078125E-4, 3.4332275390625E-4, 1.71661376953125E-4, 8.58306884765625E-5, 4.291534423828125E-5, 2.1457672119140625E-5, 1.0728836059570312E-5, 5.364418029785156E-6, 2.682209014892578E-6, 1.341104507446289E-6, 6.705522537231445E-7, 3.3527612686157227E-7];
    // const projection = new Projection({
    //     code: 'EPSG:4326',
    //     units: 'degrees',
    //     axisOrientation: 'neu'
    // });
    // params = {
    //     'REQUEST': 'GetTile',
    //     'SERVICE': 'WMTS',
    //     'VERSION': '1.0.0',
    //     'LAYER': layerName,
    //     'STYLE': '',
    //     'TILEMATRIX': gridsetName + ':{z}',
    //     'TILEMATRIXSET': gridsetName,
    //     'FORMAT': format,
    //     'TILECOL': '{x}',
    //     'TILEROW': '{y}'
    // };

    

    // const constructSourceUrl = (url, params) => {
    //     // let requestUrl = url + '?'
    //     // for (let param in params) {
    //     //     requestUrl = requestUrl + param + '=' + params[param] + '&';
    //     // }
    //     // requestUrl = requestUrl.slice(0, -1);
    //     // console.log("WMTS Request URL", requestUrl)
    //     // return requestUrl
    //     return 
    // }

    // const vectorTileSource = new OLVectorTile({
    //     ...props,
    //     url: 'http://localhost:8600/geoserver/gwc/service/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=actinia:huc_12&STYLE=&TILEMATRIX=EPSG:4326:{z}&TILEMATRIXSET=EPSG:4326&FORMAT=application/vnd.mapbox-vector-tile&TILECOL={x}&TILEROW={y}',
    //     format: new OLMVT(),
    //     projection,
    //     style: style_simple,
    //     tileGrid: new WMTS({
    //         tileSize: [256,256],
    //         origin: [-180.0, 90.0],
    //         resolutions: resolutions,
    //         matrixIds: gridNames
    //     }),
    //     wrapX: true,
        
    // })
    // console.log("WMTS Request Source", vectorTileSource)


const gridsetName = 'EPSG:4326';
const gridNames = ['EPSG:4326:0', 'EPSG:4326:1', 'EPSG:4326:2', 'EPSG:4326:3', 'EPSG:4326:4', 'EPSG:4326:5', 'EPSG:4326:6', 'EPSG:4326:7', 'EPSG:4326:8', 'EPSG:4326:9', 'EPSG:4326:10', 'EPSG:4326:11', 'EPSG:4326:12', 'EPSG:4326:13', 'EPSG:4326:14', 'EPSG:4326:15', 'EPSG:4326:16', 'EPSG:4326:17', 'EPSG:4326:18', 'EPSG:4326:19', 'EPSG:4326:20', 'EPSG:4326:21'];
// const baseUrl = 'http://localhost:8600/geoserver/gwc/service/wmts';
const style = '';
const format = 'application/vnd.mapbox-vector-tile';
const infoFormat = 'text/html';
const layerName = 'savana:huc_12';
const projection = new Projection({
code: 'EPSG:4326',
units: 'degrees',
axisOrientation: 'neu'
});
const resolutions = [0.703125, 0.3515625, 0.17578125, 0.087890625, 0.0439453125, 0.02197265625, 0.010986328125, 0.0054931640625, 0.00274658203125, 0.001373291015625, 6.866455078125E-4, 3.4332275390625E-4, 1.71661376953125E-4, 8.58306884765625E-5, 4.291534423828125E-5, 2.1457672119140625E-5, 1.0728836059570312E-5, 5.364418029785156E-6, 2.682209014892578E-6, 1.341104507446289E-6, 6.705522537231445E-7, 3.3527612686157227E-7];
params = {
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

const constructSource = (baseUrl) => {
  let url = baseUrl+'?'
  for (var param in params) {
    url = url + param + '=' + params[param] + '&';
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


    return constructSource(baseUrl)
}