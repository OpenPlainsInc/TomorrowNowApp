// react
import React, { useState, useEffect } from 'react';
// import 'ol/ol.css';
import './game.scss';
// openlayers
// import XYZ from 'ol/source/XYZ';
import nlcdSource from '../../components/OpenLayers/Sources/nlcd';
import ned3DepSource from '../../components/OpenLayers/Sources/ned3dep';
import VectorSource from '../../components/OpenLayers/Sources/VectorSource';
// import nhdPlusSource from '../../components/OpenLayers/Sources/nhdPlus'
import survery from '../../components/OpenLayers/Sources/survey';
import Map from "../../components/OpenLayers/Map"
import Layers from "../../components/OpenLayers/Layers/Layers"
import TileLayer from "../../components/OpenLayers/Layers/TileLayer"
import VectorLayer from "../../components/OpenLayers/Layers/VectorLayer"
// import { fromLonLat } from 'ol/proj';
import osm from "../../components/OpenLayers/Sources/osm"
import Controls from "../../components/OpenLayers/Controls/Controls";
// import FullScreenControl from "../../components/OpenLayers/Controls/FullScreenControl";
// import ZoomSliderControl from "../../components/OpenLayers/Controls/ZoomSliderControl";
import { ScaleLineControl, ZoomSliderControl, FullScreenControl, RotateControl, EditMapControl } from "../../components/OpenLayers/Controls";
// import Reprojection from "../../components/OpenLayers/Views/Reprojection";
import surveyStyles from '../../components/OpenLayers/Features/surveyStyles';
// import {sourcesFromTileGrid} from 'ol/source';

import GeoTIFFSource from '../../components/OpenLayers/Sources/GeoTIFF'
// import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
// import GrassColors from '../../components/OpenLayers/Colors'
// import utils from "../../components/OpenLayers/Colors/utils";
import {TileDebug} from 'ol/source';
// import Container from 'react-bootstrap/esm/Container';
import Events from '../../components/OpenLayers/Events/Events';
import OnClick from '../../components/OpenLayers/Events/onClick';
import OnMoveEnd from '../../components/OpenLayers/Events/onMoveEnd';

import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import WMSGetFeatureInfo from 'ol/format/WMSGetFeatureInfo';

// import VectorSource from "ol/source/Vector";
// import { Style, Stroke } from "ol/style";
// import surveyStyles from "../Features/surveyStyles"

// Locally calculate Upstream Contributing Area
// https://openlayers.org/en/latest/examples/region-growing.html

const Game = ({params}) => {
    
    const [center, setCenter] = useState([-78.6802,35.8408]);
    const [zoom, setZoom] = useState(11);
    const [projection, setProjection] = useState('EPSG:4326')
    const [legend, setLegend] = useState(nlcdSource({LAYERS: "NLCD_01-19_Land_Cover_Change_First_Disturbance_Date"}).getLegendUrl())
    const [surveyData, setSurveyData] = useState([])
    // const [nlcdDataSouce, setNlcdDataSource] = useState(GeoTIFFSource({
    //   sources: [
        // {
        //   url: 'https://www.mrlc.gov/geoserver/mrlc_download/NLCD_2016_Land_Cover_L48/wcs?service=WCS&version=2.0.1&request=GetCoverage&FORMAT=image/tiff&coverageId=mrlc_download__NLCD_2016_Land_Cover_L48&CRS=EPSG:4326&BBOX=35.68359375%2C-78.75%2C35.859375%2C-78.57421875'
        // }
    //   ]
    // }))

    

    const data = [
      {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
      },
      {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
      },
      {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
      },
      {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
      },
      {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
      },
      {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
      },
      {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
      },
    ];

    function onMoveEventHandler(e) {
      console.log("VectorLayer Click Event:", e)
      const view = e.target.getView()
      const extent = view.calculateExtent()
      console.log('extent', extent, 'resolution', view.getResolution())
      const viewResolution = (view.getResolution());
      const url = nlcdSource({LAYERS: 'NLCD_2019_Land_Cover_L48'}).getFeatureInfoUrl(
        extent,
        viewResolution,
        'EPSG:4326',
        {'INFO_FORMAT': 'application/json'}
      );
      console.log(url)
      if (url) {
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            console.log("NLCD Data",data)
            // document.getElementById('info').innerHTML = html;
        });
      }
   
      e.target.getLayers().forEach((el) => {

        if (el.get('name') === "survey") {
          console.log(el.getSource().getFeatures().map(f=>f.getProperties()))
         let properties =  el.getSource().getFeatures().map(f=> {
            return f.getProperties()
          })


          var groupBy = function(data, key) { // `data` is an array of objects, `key` is the key (or property accessor) to group by
            // reduce runs this anonymous function on each element of `data` (the `item` parameter,
            // returning the `storage` parameter at the end
            return data.reduce(function(storage, item) {
              // get the first instance of the key by which we're grouping
              var group = item[key];
              
              // set `storage` for this instance of group to the outer scope (if not empty) or initialize it
              storage[group] = storage[group] || []
              
              // add this item to its group within `storage`
              storage[group].push(item);
              
              // return the updated storage to the reduce function, which will then loop through the next 
              return storage; 
            }, {}); // {} is the initial value of the storage
          };

          let grouped = groupBy(properties,'how_serious_is_this_problem')


         console.log("Grouped", properties, )
       


         setSurveyData(Object.entries(grouped).map((k, v) => {
          console.log(k)
          let newData = {}
          newData.name = k[0]
          newData[k[0]] = k[1].length
          return newData
        }))

        }
      })

    }
  
    // const featureOverlayer = VectorLayer({
    //   source:VectorSource(), 
    //   style:surveyStyles.styleCache.selected
    // })
    let highlight;
    function surveyClickEvent(e) {
      console.log("VectorLayer Click Event:", e)
      const pixel = e.pixel
      const feature = e.target.forEachFeatureAtPixel(pixel, function (feature) {
        console.log(pixel, feature)
        console.log('Geometry', feature.getGeometry())
        return feature;
      });
      const view = e.target.getView()
      const extent = view.calculateExtent()
      console.log('extent', extent, 'resolution', view.getResolution())
      const viewResolution = (view.getResolution());
      const url = nlcdSource({LAYERS: 'NLCD_2019_Land_Cover_L48'}).getFeatureInfoUrl(
        extent,
        viewResolution,
        'EPSG:4326',
        {'INFO_FORMAT': 'application/json'}
      );
      console.log(url)
      if (url) {
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            console.log("NLCD Data",data)
            // document.getElementById('info').innerHTML = html;
        });
      }
     
      
      e.target.getLayers().forEach((el) => {
        if (el.get('name') === "featureOverlayer") {
          // console.log(el.getFeatures)
          // console.log(el.getSource())
          // if (feature !== highlight) {
          //   if (highlight) {
          //     el.getSource().removeFeature(highlight);
          //   }
          //   if (feature) {
          //     console.log("Set Feature",feature)
          //     el.getSource().addFeature(feature);
          //   }
          //   highlight = feature;
          // }
        }

        if (el.get('name') === "survey") {
          console.log(el.getSource().getFeatures().map(f=>f.getProperties()))
         let properties =  el.getSource().getFeatures().map(f=> {
            return f.getProperties()
          })


          var groupBy = function(data, key) { // `data` is an array of objects, `key` is the key (or property accessor) to group by
            // reduce runs this anonymous function on each element of `data` (the `item` parameter,
            // returning the `storage` parameter at the end
            return data.reduce(function(storage, item) {
              // get the first instance of the key by which we're grouping
              var group = item[key];
              
              // set `storage` for this instance of group to the outer scope (if not empty) or initialize it
              storage[group] = storage[group] || []
              
              // add this item to its group within `storage`
              storage[group].push(item);
              
              // return the updated storage to the reduce function, which will then loop through the next 
              return storage; 
            }, {}); // {} is the initial value of the storage
          };

          let grouped = groupBy(properties,'how_serious_is_this_problem')
  

         console.log("Grouped", properties, )
       


         setSurveyData(Object.entries(grouped).map((k, v) => {
          console.log(k)
          let newData = {}
          newData.name = k[0]
          newData[k[0]] = k[1].length
          return newData
        }))

        }
      })


    

      
   
    }

    useEffect(() => {
      // 'https://storage.googleapis.com/download/storage/v1/b/tomorrownow-actinia-dev/o/dem_10m_mosaic_cog.tif?alt=media'
         console.log(this)

         
      }, [])
  
        return (
          <Container>
            <Row>
              <Col md={8}>
            <Map mapClass="map-fullscreen" center={center} zoom={zoom} projection='EPSG:4326'>
             
              <Layers>
                  <TileLayer source={ned3DepSource({layer: 'Hillshade Multidirectional'})} opacity={1} ></TileLayer>
                  {/* <TileLayer source={nlcdSource()} opacity={0.5}></TileLayer> */}
                  <TileLayer source={nlcdSource({LAYERS: 'mrlc_display:NLCD_01-19_Land_Cover_Change_First_Disturbance_Date'})} opacity={0.5}></TileLayer>

                  {/* <TileLayer source={nlcdDataSouce}></TileLayer> */}
                  <TileLayer source={osm()} opacity={0.5}></TileLayer>
                  <TileLayer zIndex={5} source={new TileDebug()}></TileLayer>
                  <VectorLayer layerName="featureOverlayer" source={VectorSource()} style={surveyStyles.styleCache.selected}></VectorLayer>
                  <VectorLayer layerName="survey" source={survery()}  style={surveyStyles.setSurveyStyle} ></VectorLayer> 
                   

              </Layers>

              <Events>
                <OnClick eventHandler={surveyClickEvent} />
                <OnMoveEnd eventHandler={onMoveEventHandler}></OnMoveEnd>
              </Events>

              <Controls>
                  <FullScreenControl />
                  <ZoomSliderControl />
                  <ScaleLineControl />
                  {/* <RotateControl autoHide={false}/> */}
                  <EditMapControl />
              </Controls>
              </Map>
              </Col>
             
             <Col md={4}>
                <BarChart
                  width={500}
                  height={400}
                  data={surveyData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                 

           

            <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="unserious" fill={surveyStyles.colorScheme[0]} />
                  <Bar dataKey="somewhat_unserious" fill={surveyStyles.colorScheme[1]} />
                  <Bar dataKey="neutral" fill={surveyStyles.colorScheme[2]} />
                  <Bar dataKey="somewhat_serious" fill={surveyStyles.colorScheme[3]} />
                  <Bar dataKey="serious" fill={surveyStyles.colorScheme[4]} />
                </BarChart>
                </Col>
                </Row>
                <Row>
                  <Col md={10}>
                  </Col>
                  <Col md={2}>
                  
                  <Card style={{ width: '18rem' }}>
                    
                    <Card.Body>
                      <Card.Title>NLCD 01-19 Land Cover Change First Disturbance Date</Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                      </Card.Text>
                    </Card.Body>
                    <Card.Img variant="top" src={legend} />
                  </Card>
                  </Col>
                </Row>
          </Container>
        )
  }


export default Game