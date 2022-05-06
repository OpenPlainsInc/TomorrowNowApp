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
import savanaSource from "../../components/OpenLayers/Sources/savana"
import Controls from "../../components/OpenLayers/Controls/Controls";
// import FullScreenControl from "../../components/OpenLayers/Controls/FullScreenControl";
// import ZoomSliderControl from "../../components/OpenLayers/Controls/ZoomSliderControl";
import { ScaleLineControl, ZoomSliderControl, FullScreenControl, RotateControl, EditMapControl } from "../../components/OpenLayers/Controls";
// import Reprojection from "../../components/OpenLayers/Views/Reprojection";
import surveyStyles from '../../components/OpenLayers/Features/surveyStyles';
import vectorStyles from '../../components/OpenLayers/Features/Styles'
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
import OnMapEvent from '../../components/OpenLayers/Events/onMapEvent';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, FunnelChart, Funnel, LabelList, ResponsiveContainer } from 'recharts';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import WMSGetFeatureInfo from 'ol/format/WMSGetFeatureInfo';
import GrassColors from '../../components/OpenLayers/Colors'
import utils from "../../components/OpenLayers/Colors/utils";
import nlcdColors from "../../components/OpenLayers/Colors/nlcd"
import WebGLTileLayer from "../../components/OpenLayers/Layers/WebGLTileLayer"
import nlcdCOGSource from "../../components/OpenLayers/Sources/nlcdCog"
import Reprojection from "../../components/OpenLayers/Views/Reprojection";
import ActiniaGeoTiff from '../../components/OpenLayers/Sources/ActiniaGeoTiff';
import { NLCDLegend } from '../../components/Grass/Utils';
import basinResponseSource from './basinResponseSource';
// import VectorSource from "ol/source/Vector";
// import { Style, Stroke } from "ol/style";
// import surveyStyles from "../Features/surveyStyles"

// Locally calculate Upstream Contributing Area
// https://openlayers.org/en/latest/examples/region-growing.html

const Game = ({params}) => {
    
    const [center, setCenter] = useState([-78.6802,35.8408]);
    const [zoom, setZoom] = useState(11);
    const [basinRaster, setBasinRaster] = useState(null);

    const [projection, setProjection] = useState('EPSG:4326')
    const [legend, setLegend] = useState(nlcdSource({LAYERS: "NLCD_2019_Land_Cover_L48"}).getLegendUrl())
    const [surveyData, setSurveyData] = useState([])
    const [extent, setExtent] = useState(null)
    const [source, setSource] = useState(null);
    const [view, setView] = useState(null)
    const [status, setStatus] = useState(null)
    const [resourceId, setResourceId] = useState(null)
    const [dataRangeMin, setDataRangeMin] = useState(null)
    const [dataRangeMax, setDataRangeMax] = useState(null)
    const [socketUrl, setSocketUrl] = useState(null);
    const [messageHistory, setMessageHistory] = useState(['test']);
    const { sendMessage, lastMessage, lastJsonMessage, readyState, getWebSocket } = useWebSocket(socketUrl, { share: false });
    const [tileColor, setTileColor] = useState(GrassColors.utils.autoDetectPalette())
    const [nlcdData, setNlcdData] = useState(null)
    const [basinWMSSource, setBasinWMSSource] = useState(savanaSource({LAYERS: 'mrlc_display:NLCD_2019_Land_Cover_L48'})) 




    const [surveySource, setSurveySource] = useState(survery(loadSurveyData))
    const [isSurveyDataLoaded, setIsSurveyDataLoaded] = useState(false)
    const connectionStatus = {
      [ReadyState.CONNECTING]: 'Connecting',
      [ReadyState.OPEN]: 'Open',
      [ReadyState.CLOSING]: 'Closing',
      [ReadyState.CLOSED]: 'Closed',
      [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];
    let _csrfToken = null;
    const API_HOST = "http://localhost:8005/savana"

    const [tileStyle, setTileStyle] = useState({
      // color: GrassColors.utils.autoDetectPalette(params.rasterId),
      color: undefined,
      exposure: ['var', 'exposure'],
      contrast: ['var', 'contrast'],
      saturation: ['var', 'saturation'],
      gamma: ['var', 'gamma'],
      // color: ['var', 'color'],
      variables: {
          exposure: 0,
          contrast: 0,
          saturation: 0,
          gamma: 1,
          color: undefined,
          level: 0
        }
    })

    const basinStyle = vectorStyles.Polygon

  
    let groupBy = function(data, key) { // `data` is an array of objects, `key` is the key (or property accessor) to group by
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

    function onMoveEventHandler(e) {
      const view = e.target.getView()
      const _extent = view.calculateExtent()
      console.log('extent', _extent, 'resolution', view.getResolution())
      setExtent(extent)
      console.log(e.target.getLayers())
      e.target.getLayers().forEach((el) => {

        if (el.get('name') === "nlcd2019") {
          console.log("onMove nlcd2019", el)
          console.log("onMove nlcd2019")
        }

        if (el.get('name') === "survey") {
        
          let properties = []
          el.getSource().forEachFeatureInExtent(_extent, (f) => {
            properties.push(f.getProperties())
          })
          console.log("onMoveEnd properites: ", properties)
          if (!properties) return;

          let grouped = groupBy(properties,'how_serious_is_this_problem')


          console.log("Grouped", properties, )
       
          setSurveyData(Object.entries(grouped)
            .map((k, v) => {
              console.log(k)
              let newData = {}
              newData.name = k[0]
              newData[k[0]] = k[1].length
              return newData
            })
          )

        }
      })

    }

   
  
 
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


    
      let isMounted = true;   
      async function rDrain(coords) {
            setBasinRaster(null)
            try {
               
                

                let geojson = [{
                  point: coords.join(','),
                  extent: extent
                }]

                let url = new URL(`${API_HOST}/r/drain/`)
                console.log(coords)
                const res = await fetch(url, {
                    method: "POST",
                    body: JSON.stringify(geojson),
                    headers: {
                       
                        'Content-Type': 'application/json'
                    }
                    
                });
                const data = await res.json();
                console.log("response:", data)             
                setResourceId(data.response.resource_id)
                setStatus(data.response.status)
               

              } catch (e) {
                console.log(e);
            }
            return () => { isMounted = false }

        }
        rDrain(e.coordinate)
      
    }


    function loadSurveyData(surveySource) {
      if (!surveySource) return;
      if (isSurveyDataLoaded) return;
      console.log("Survey Source: ", surveySource)
      // surveySource.on('featuresloadend', onPostRenderEvent)
      let properties = surveySource.target.getFeatures().map(f => {
        return f.getProperties()
      })

      
      if (!properties.length) return;
      console.log("Survey Source Properties: ", properties)
      let grouped = groupBy(properties,'how_serious_is_this_problem')
  
      setSurveyData(Object.entries(grouped)
        .map((k, v) => {
          let newData = {}
          newData.name = k[0]
          newData[k[0]] = k[1].length
          return newData
        })
      )
      setIsSurveyDataLoaded(true)
      return surveyData
    }

    // Get Websocket message history
    useEffect(() => {
      if (lastMessage !== null) {
        setMessageHistory((prev) => prev.concat(lastMessage));
      }
    }, [lastMessage, setMessageHistory]);

    // Open Websocket Connention for resource
    useEffect(()=> {
      if (!resourceId || !status) return;
      console.log("Starting Websocket...")
      console.log("Websocket: ResourceId Received...")
      console.log(`Websocket: Resource Id: ${resourceId}`)
      let resourceName = resourceId.replace(/-/g , '_')
      console.log(`Websocket: Resource Name: ${resourceName}`)

      setSocketUrl( `ws://localhost:8005/ws/savana/resource/${resourceName}/`)

  },[source, status, resourceId])

  // Send websocket status message to server
  useEffect(()=> {
      if (readyState != ReadyState.OPEN) return;
      console.log("Sending Websocket Message: ", status)
      sendMessage(JSON.stringify({message: status, resource_id: resourceId}))
      setMessageHistory([{message: status, resource_id: resourceId}])
  },[connectionStatus])

  // Log last message from Websocket
  useEffect(()=> {
      if (readyState != ReadyState.OPEN) return;
      console.log("Last Websocket Message", lastMessage)

  },[lastMessage])

  // Set source data once data is finished
  useEffect(() => {
      if (!lastJsonMessage) return;
      if (lastJsonMessage.message !== 'finished') return;

      console.log("Last Message: ", lastJsonMessage)
      if (lastJsonMessage) {
          
          if (lastJsonMessage.process_log) {
            function sliceIntoChunks(arr, chunkSize) {
              const res = [];
              for (let i = 0; i < arr.length; i += chunkSize) {
                  const chunk = arr.slice(i, i + chunkSize);
                  res.push(chunk);
              }
              return res;
            }
            // Cat, Label, area, cells, %
            let rawnlcdData = lastJsonMessage.process_log
              .filter(f => f.executable === 'r.stats')
              .map(e => {
                console.log("Stats", e)
                return e.stdout.split("|").slice(0, -4)
              }).map(i => i.map(s=> s.replace("\n", "|").split("|")).flatMap(x=>{
                return x //parseInt(x)//parseFloat(x).toFixed(2)
              })).flatMap(x=>x)

             
              console.log("NLCD", nlcdColors)
              let nlcdGraphData = sliceIntoChunks(rawnlcdData, 5).map(d => {
                let catId = parseInt(d[0])
                console.log('d', catId, nlcdColors.categories)
                let catDetails = nlcdColors.categories.filter(c => c.category === catId)[0]
                console.log('catDetails', catDetails)


                let tmp =  {
                  cat: catId,
                  color: catDetails ? catDetails.category_color : "#fff",
                  label: catDetails ? catDetails.category_label : "",
                  area: (parseFloat(d[2])/ 1e6).toFixed(2),
                  cells: parseInt(d[3]),
                  percent: d[4],
                  catDetails
                }
                tmp[tmp.label] = tmp.area
                return tmp
              })
              setNlcdData(nlcdGraphData)
            console.log("Raw NLCD Summary Data", nlcdGraphData)
          }
          basinWMSSource.clear()
          setBasinRaster("point_basin")

         
      }
  }, [lastJsonMessage]);



      const nlcdTotalArea = (data) => {
        const areaList = data.filter(c=> c.catDetails).map(c=>c.area).reduce((a,b) => parseFloat(a) + parseFloat(b))
        console.log("Area List", areaList)
        return areaList.toFixed(2)
      }
  
        return (
          <Container fluid className="bg-light text-dark">
              
            <Row>
              <Col md={6}>
                <Map mapClass="map-fullscreen" center={center} zoom={zoom} projection='EPSG:4326'>
                
                  <Layers>
                      <TileLayer source={ned3DepSource({layer: 'Hillshade Multidirectional'})} opacity={1} ></TileLayer>
                      {/* <TileLayer source={nlcdSource()} opacity={0.5}></TileLayer> */}
                      <TileLayer source={nlcdSource({LAYERS: 'mrlc_display:NLCD_2019_Land_Cover_L48'})} opacity={0.5}></TileLayer>
                      {/* <TileLayer layerName="nlcd2019" source={nlcdCOGSource()} opacity={1}></TileLayer> */}
                      {/* <WebGLTileLayer layerName="nlcd2019" source={nlcdCOGSource()} opacity={1}></WebGLTileLayer> */}

                      {/* <TileLayer source={nlcdDataSouce}></TileLayer> */}
                      <TileLayer source={osm()} opacity={0.5}></TileLayer>
                      <TileLayer zIndex={5} source={new TileDebug()}></TileLayer>
                      {
                        basinRaster ? 
                        <VectorLayer
                          layerName="basin"
                          style={basinStyle}
                          source={basinResponseSource()}
                        ></VectorLayer>
                        // <TileLayer 
                        //   source={basinWMSSource} 
                        //   opacity={0.5}>
                        // </TileLayer> 
                        : null
                      }
              
                      {/* {
                        basinRaster ? 
                          <ActiniaGeoTiff 
                            rasterName={basinRaster} 
                            mapsetName="basin_test"
                            opacity={0.75}
                          ></ActiniaGeoTiff> : null
                      } */}
                      
                      <VectorLayer layerName="featureOverlayer" source={VectorSource()} style={surveyStyles.styleCache.selected}></VectorLayer>
                      <VectorLayer 
                        layerName="survey" 
                        source={surveySource}  
                        style={surveyStyles.setSurveyStyle}
                      ></VectorLayer> 

                      
                      

                  </Layers>

                  <Events>
                    {/* <OnMapEvent eventName='postrender' eventHandler={onPostRenderEvent}></OnMapEvent> */}
                    <OnMapEvent eventName='click' eventHandler={surveyClickEvent}></OnMapEvent>
                    <OnMapEvent eventName='moveend' eventHandler={onMoveEventHandler}></OnMapEvent>
                
                  </Events>

                  <Controls>
                      <FullScreenControl />
                      <ZoomSliderControl />
                      <ScaleLineControl />
                    
                      {/* <EditMapControl drawTypes={['Point']}/> */}
                  </Controls>
              

                </Map>
              </Col>
             
              {/* <Col md={1}></Col> */}
             
             <Col md={4} >                
                  { 
                    nlcdData ? 
                  <Row className="bg-alert text-dark">
                  
                    <Card bg="bg-secondary-light" text="dark">
                    
                    <Card.Body>
                      <Card.Title>Upstream Land Use Characteristics</Card.Title>
                      <Card.Subtitle>Total Area ({nlcdTotalArea(nlcdData)} km<sup>2</sup>)</Card.Subtitle>
                      
                    </Card.Body>
                    <div style={{backgroundColor: "white"}}>
                    <BarChart
                      width={500}
                      height={400}
                      data={nlcdData}
                      // layout="horizontal"
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                      barSize={5}
                    >
                      <XAxis dataKey="cat" scale="point" padding={{ left: 10, right: 10 }}  />
                      <YAxis  />
                      <Tooltip />
                      <Legend />
                      <CartesianGrid strokeDasharray="3 3" />
                      {/* {
                        nlcdData.map((d, idx) => {
                          let catLab = d.label
                          return(<Bar key={idx} dataKey={catLab} fill={d.color} background={{ fill: '#eee' }} />)
                        })
                          
                      } */}
                      <Bar
                          dataKey="area"
                          fill="#000"
                          stroke="#000"
                          // layout="vertical"
                          strokeWidth={1}>
                          {
                              nlcdData.map((d, idx) => (
                                  <Cell key={`cell-${idx}`} fill={d.color} />
                              ))
                          }
                      </Bar>
                      
                    </BarChart>
                    </div>
                    <Card.Footer>
                      <Card.Text>
                      USGS NLCD
                      </Card.Text>
                    </Card.Footer>
                  </Card>
                  </Row>
                  :  
                  <Row >
                  


                    <Card bg="bg-secondary-light" text="dark">
                    
                    <Card.Body>
                      <Card.Title>Survey Data</Card.Title>
                      <Card.Subtitle>Stormwater Problem Severity</Card.Subtitle>
                      
                    </Card.Body>
                    <div style={{backgroundColor: "white"}}>

                    <BarChart 
                       width={500}
                       height={400}
                       data={surveyData}
                       margin={{
                         top: 10,
                         right: 10,
                         left: 10,
                         bottom: 10,
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
                  
                     </div>
                    <Card.Footer>
                      <Card.Text>
                       Data Collected during RCN Workshop...
                      </Card.Text>
                    </Card.Footer>
                  </Card>
                  </Row>
                }
            </Col>
               
                  <Col md={2}>
                  
                  <Card
                  //  style={{ width: '20rem' }} 
                   className="bg-secondary-light text-dark">
                    
                    <Card.Body>
                      <Card.Title>NLCD Land Cover Categories</Card.Title>
                    
                    </Card.Body>
                    <NLCDLegend categories={nlcdColors.categories} family={true} ></NLCDLegend>
                    {/* <Card.Img variant="top" src={legend} /> */}
                  </Card>

                  
                  </Col>
                </Row>
          </Container>
        )
  }


export default Game