// react
import React, { useState, useEffect } from 'react';
import './game.scss';

import Map from "../../components/OpenLayers/Map"
import Layers from "../../components/OpenLayers/Layers/Layers"
import TileLayer from "../../components/OpenLayers/Layers/TileLayer"
import VectorLayer from "../../components/OpenLayers/Layers/VectorLayer"
import osm from "../../components/OpenLayers/Sources/osm"
import savanaSource from "../../components/OpenLayers/Sources/savana"
import Controls from "../../components/OpenLayers/Controls/Controls";
import { ScaleLineControl, ZoomSliderControl, FullScreenControl, RotateControl, EditMapControl } from "../../components/OpenLayers/Controls";
import surveyStyles from '../../components/OpenLayers/Features/surveyStyles';
import vectorStyles from '../../components/OpenLayers/Features/Styles'
import GeoTIFFSource from '../../components/OpenLayers/Sources/GeoTIFF'
// import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

// import utils from "../../components/OpenLayers/Colors/utils";
import {TileDebug} from 'ol/source';
// import Container from 'react-bootstrap/esm/Container';
import Events from '../../components/OpenLayers/Events/Events';
import OnMapEvent from '../../components/OpenLayers/Events/onMapEvent';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import GrassColors from '../../components/OpenLayers/Colors'
import utils from "../../components/OpenLayers/Colors/utils";
import nlcdColors from "../../components/OpenLayers/Colors/nlcd"
import WebGLTileLayer from "../../components/OpenLayers/Layers/WebGLTileLayer"
import {nlcdCOGTileGridSource as nlcdCOGSource, getColorMap as nlcdCogColors} from "../../components/OpenLayers/Sources/nlcdCog"
import { Interactions, Draw } from '../../components/OpenLayers/Interactions';
// import Reprojection from "../../components/OpenLayers/Views/Reprojection";
// import ActiniaGeoTiff from '../../components/OpenLayers/Sources/ActiniaGeoTiff';
import { NLCDLegend } from '../../components/Grass/Utils';
import basinResponseSource from './basinResponseSource';
import Overlays from '../../components/OpenLayers/Overlays/Overlays';
import { AnimatedCanvasOverlay } from '../../components/OpenLayers/Overlays';
import { hucBoundaries, survey, nlcdSource, ned3DepSource, VectorSource, hucStyle, VectorTileSource } from '../../components/OpenLayers/Sources';
import { VectorTileLayer } from '../../components/OpenLayers/Layers/VectorTileLayer';
import { ChartsContainer } from '../../components/Grass/Charts/ChartsContainer';
import { Charts, ChartTypes} from '../../components/Grass/Charts/ChartTypes';
import { highlightSelected } from '../../components/OpenLayers/Filters/highlightSelected';
import { useActiniaAsyncProcess } from '../../components/Grass/Utils/useActiniaAsyncProcess';
import { rDrain } from './rDrain';
// Locally calculate Upstream Contributing Area
// https://openlayers.org/en/latest/examples/region-growing.html

const Game = ({params}) => {
  const [center, setCenter] = useState([-78.6802,35.8408]);
    const [zoom, setZoom] = useState(11);
    const [basinRaster, setBasinRaster] = useState(null);

    const [projection, setProjection] = useState('EPSG:4326')
    const [surveyData, setSurveyData] = useState([])
    const [extent, setExtent] = useState(null)
    const [source, setSource] = useState(null);
    const [view, setView] = useState(null)
    const [status, setStatus] = useState(null)
    const [resourceId, setResourceId] = useState(null)
    const {lastJsonMessage, messageHistory, wsState} = useActiniaAsyncProcess({resourceId, status})
    const [tileColor, setTileColor] = useState(GrassColors.utils.autoDetectPalette())
    const [nlcdData, setNlcdData] = useState(null)
    const [basinElevationInfo, setBasinElevationInfo] = useState(null)
    const [loadingAnimation, setLoadingAnimation] = useState(false)
    const [pointSource, setPointSouce] = useState(VectorSource({noWrap: true}))
    const [selectedBasin, setSelectedBasin] = useState(null)
    const [wms3depSource, setWms3depSource] = useState(ned3DepSource({layer: 'Hillshade Multidirectional'}))


    const [surveySource, setSurveySource] = useState(survey(loadSurveyData))
    const [isSurveyDataLoaded, setIsSurveyDataLoaded] = useState(false)

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

    const onPointerMoveEnd = (e) => {
      // "HUC12_VT"
      console.log("onPointerMoveEnd: e", e)

      if (selectedBasin !== null) {
        selectedBasin.setStyle(undefined);
        selectedBasin = null;
      }

      e.target.getLayers().forEach((el) => {

        if (el.get('name') === "HUC12_VT") {
          console.log("onPointerMoveEnd HUC12_VT", el)
          e.map.forEachFeatureAtPixel(e.pixel, function (f) {
            console.log("onPointerMoveEnd: feature", f)
            // basinResponseSource.selectStyle.getFill().setColor(f.get('COLOR') || '#eeeeee');
            // f.setStyle(basinResponseSource.selectStyle);
            setSelectedBasin(f.getId())
            el.getFeatures(feat =>{
              if (f.getId() === feat.getId()) {
                // return feat.setStyle(basinResponseSource.selectStyle)
              }
              else {
                // return feat.setStyle(basinResponseSource.hucStyle)
              }
            })
            return true;
          });
         
        }
      })
    
      
    
    }

  
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
      setLoadingAnimation(true)
      const pixel = e.pixel
      const features = e.target.forEachFeatureAtPixel(pixel, feature => {
        console.log('Feature', pixel, feature)
        // console.log('Geometry', feature.getExtent())
        // let hucExtent = feature.getExtent()
        // setExtent(hucExtent)
        return feature;
      });

      console.log("Clicked Features", features)
      // let hucExtent = features.getExtent()
      // setExtent(hucExtent)
      const view = e.target.getView()
      const extent = view.calculateExtent()
      console.log('extent', extent, 'resolution', view.getResolution())


    
      let isMounted = true;   
      async function runProcess(coords, extent) {
        setBasinRaster(null)
        let data = await rDrain(coords, extent)
        console.log("response:", data)             
        setResourceId(data.response.resource_id)
        setStatus(data.response.status)
        return () => { isMounted = false }
      }
      runProcess(e.coordinate, extent)
      
    }


    function loadSurveyData(surveySource) {
      if (!surveySource) return;
      if (isSurveyDataLoaded) return;
      console.log("Survey Source: ", surveySource)
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

  // Set source data once data is finished
  useEffect(() => {
      if (!lastJsonMessage) return;
      console.log("Last Message: ", lastJsonMessage)
      if (lastJsonMessage.message !== 'finished') return;

      console.log("Last Message Finished: ", lastJsonMessage)
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

            let tmpBasinElevationInfo = lastJsonMessage.process_log
              .filter(f => f.executable === 'r.univar')
              .map(e => {
                 let rows = e.stdout.split('\n').map(a=> a.split('|'))
                 const obj = rows[0].reduce((accumulator, element, index) => {
                  return {...accumulator, [element]: rows[1][index]};
                 }, {});
                 return obj
              })
            console.log("tmpBasinElevationInfo", tmpBasinElevationInfo)
            setBasinElevationInfo(tmpBasinElevationInfo)
            // Cat, Label, area, cells, %
            let rawnlcdData = lastJsonMessage.process_log
              .filter(f => f.executable === 'r.stats' && f.id !== "r.stats_3dep_30m")
              .map(e => {
               
                let output = e.stdout.split("|").slice(0, -5) 
               
                let year = e.id.split("_")[1]
              
                output.push(String(year))
                // let labeledOutput = 
                console.log(output)
                return output
              }).map(i => i.map(s=> s.replace("\n", "|").split("|")).flatMap(x=>{
                return x
              })).flatMap(x=> {
               
                let year = x.pop()
                let nlcdGraphData = sliceIntoChunks(x, 5).map(d => {
                  let catId = parseInt(d[0])
                 
                  
                  let catDetails = nlcdColors.categories.filter(c => c.category === catId)[0]
                
  
  
                  let tmp =  {
                    cat: catId,
                    color: catDetails ? catDetails.category_color : "#fff",
                    label: catDetails ? catDetails.category_label : "",
                    area: (parseFloat(d[2])/ 1e6).toFixed(2),
                    cells: parseInt(d[3]),
                    percent: d[4],
                    catDetails,
                    year: year
                  }
                  tmp[tmp.label] = tmp.area
                  console.log("tmp", tmp)
                  return tmp
                })

                return nlcdGraphData
              })

       
              lineChartDataFormat(rawnlcdData)
              setNlcdData(rawnlcdData)
            console.log("Raw NLCD Summary Data", rawnlcdData)
          }
          setLoadingAnimation(false)
          setBasinRaster("point_basin")

         
      }
  }, [lastJsonMessage]);

       
  const lineChartDataFormat = (data) => {  
    let finalFormat = []
    let tmpYear = {}
               
    data.map(c => {
      if (!tmpYear.year) {
        tmpYear.year = c.year
      }
    
      if (tmpYear.year !== c.year) {
        finalFormat.push(tmpYear)
        tmpYear = {
          year: c.year
        }
      }

      tmpYear[c.label] = c.area
                  
    })

    // Add the last year
    finalFormat.push(tmpYear)
    return finalFormat
  }

  const nlcdTotalArea = (data) => {
    const areaList = data.filter(c=> c.catDetails).map(c=>c.area).reduce((a,b) => parseFloat(a) + parseFloat(b))
    return areaList.toFixed(2)
  }
  
        return (
          <Container fluid className="bg-light text-dark">
              
            <Row>
              <Col md={6}>
                {/* {lastJsonMessage} */}
                <Map mapClass="map-fullscreen" center={center} zoom={zoom} projection='EPSG:4326'>
                
                  <Layers>
                      <TileLayer source={wms3depSource} opacity={1} ></TileLayer>
                      <TileLayer source={osm()} opacity={0.75}></TileLayer>
                      <TileLayer source={nlcdSource({LAYERS: 'mrlc_display:NLCD_2019_Land_Cover_L48'})} opacity={0.5}></TileLayer>

                      {/* <WebGLTileLayer 
                        layerName="nlcd2019" 
                        preload={12}
                        cacheSize={1024}
                        // style={{color: nlcdColors.webGLColors}}
                        // color={nlcdColors.webGLColors}
                        source={nlcdCOGSource({layer: 2019})} 
                        // onPostRender={highlightSelected}
                        opacity={0.40} 
                        zIndex={1}/> */}

                      
                      <TileLayer zIndex={5} source={new TileDebug()}></TileLayer>
                      {
                        basinRaster ? 
                        <VectorLayer
                          layerName="basin"
                          style={basinStyle}
                          source={basinResponseSource.source()}
                        ></VectorLayer>
                    
                        : null
                      }
                    
                      {/* <VectorLayer
                        layerName="HUC12"
                        source={hucBoundaries("HUC12")}
                        style={hucStyle()}
                      /> */}

                      <VectorTileLayer 
                        layerName="HUC12_VT"
                        zIndex={1}
                        minZoom={10}
                        declutter={true}
                        renderMode="vector"
                        style={hucStyle()}
                        source={
                          VectorTileSource({
                            baseUrl:`http://localhost:8600/geoserver/gwc/service/wmts`
                          })
                        }
                      />

                      <VectorLayer 
                        layerName="featureOverlayer" 
                        source={VectorSource()} 
                        style={surveyStyles.styleCache.selected}
                      />
                      <VectorLayer 
                        layerName="survey" 
                        source={surveySource}  
                        style={surveyStyles.setSurveyStyle}
                        zIndex={1}
                      />
                      <VectorLayer
                        layerName="point"
                        source={pointSource}
                        zIndex={1}
                      />

                     
                  </Layers>

                  <Overlays>
                    <AnimatedCanvasOverlay acanvas="Rain" visible={loadingAnimation}/>
                    <AnimatedCanvasOverlay acanvas="Clouds" visible={loadingAnimation}/>
                  </Overlays>

                  <Events>
                    {/* <OnMapEvent eventName='postrender' eventHandler={onPostRenderEvent}></OnMapEvent> */}
                    <OnMapEvent eventName='click' eventHandler={surveyClickEvent}></OnMapEvent>
                    <OnMapEvent eventName='moveend' eventHandler={onMoveEventHandler}></OnMapEvent>
                    {/* <OnMapEvent eventName='pointermove' eventHandler={onPointerMoveEnd}></OnMapEvent> */}
                  </Events>

                  <Controls>
                      <FullScreenControl />
                      <ZoomSliderControl />
                      <ScaleLineControl />
                  </Controls>
              
                  <Interactions>
                      <Draw source={pointSource}></Draw>
                  </Interactions>
                  {/* <Reprojection epsg=""></Reprojection>  */}
                </Map>
              </Col>
             
             
             <Col md={4} >                
                  { 
                    nlcdData ? 
                  <Row className="bg-alert text-dark">
                  
                    <Card bg="bg-secondary-light" text="dark">
                    
                    <Card.Body>
                      <Card.Title>Upstream Land Use Characteristics</Card.Title>
                      <Card.Subtitle>Total Area ({nlcdTotalArea(nlcdData)} km<sup>2</sup>)</Card.Subtitle>
                      {basinElevationInfo ? basinElevationInfo.map(e=> {
                        return(
                          <>
                          <Card.Subtitle>Mean Elevation ({parseFloat(e.mean).toFixed(2)} sd {parseFloat(e.stddev).toFixed(2)}) (m)</Card.Subtitle>
                          <Card.Subtitle>Min - Max Elevation ({parseFloat(e.min).toFixed(2)}m - {parseFloat(e.max).toFixed(2)})m</Card.Subtitle>
                          </>
                        )
                      }): null
                      } 
                    </Card.Body>
                    <div style={{backgroundColor: "white"}}>
                    <ChartsContainer 
                      options={[ChartTypes.BAR, ChartTypes.LINE, ChartTypes.AREA]}
                      data={lineChartDataFormat(nlcdData)} 
                      colorMap={nlcdData}>
                    <Charts/>
                    </ChartsContainer>
                   
            
                    
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