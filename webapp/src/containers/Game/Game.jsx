// react
import React, { useState, useEffect, useCallback, useRef } from 'react';
import './game.scss';

import Map from "../../components/OpenLayers/Map"
import Layers from "../../components/OpenLayers/Layers/Layers"
import TileLayer from "../../components/OpenLayers/Layers/TileLayer"
import VectorLayer from "../../components/OpenLayers/Layers/VectorLayer"
import osm from "../../components/OpenLayers/Sources/osm"
import savanaSource from "../../components/OpenLayers/Sources/savana"
import Controls from "../../components/OpenLayers/Controls/Controls";
import { ScaleLineControl, ZoomSliderControl, FullScreenControl } from "../../components/OpenLayers/Controls";
import surveyStyles from '../../components/OpenLayers/Features/surveyStyles';
import { styles as vectorStyles } from '../../components/OpenLayers/Features/Styles'
import GeoTIFFSource from '../../components/OpenLayers/Sources/GeoTIFF'
// import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import geoblaze from 'geoblaze';
import GeoJSON from 'ol/format/GeoJSON';
// import utils from "../../components/OpenLayers/Colors/utils";
import {TileDebug} from 'ol/source';
// import Container from 'react-bootstrap/esm/Container';
import Events from '../../components/OpenLayers/Events/Events';
import OnMapEvent from '../../components/OpenLayers/Events/onMapEvent';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import nlcdColors from "../../components/OpenLayers/Colors/nlcd"
import WebGLTileLayer from "../../components/OpenLayers/Layers/WebGLTileLayer"
import {nlcdCOGTileGridSource as nlcdCOGSource, getColorMap as nlcdCogColors} from "../../components/OpenLayers/Sources/nlcdCog"
import { Interactions, Draw } from '../../components/OpenLayers/Interactions';
// import Reprojection from "../../components/OpenLayers/Views/Reprojection";
// import ActiniaGeoTiff from '../../components/OpenLayers/Sources/ActiniaGeoTiff';
import { NLCDLegend } from '../../components/Grass/Utils';
import basinResponseSource from './basinResponseSource';
import Overlays from '../../components/OpenLayers/Overlays/Overlays';
import { AnimatedCanvasOverlay, animatedCanvas } from '../../components/OpenLayers/Overlays';
import { hucBoundaries, survey, useNLCDSource, ned3DepSource, VectorSource, hucStyle, useVectorTileSource } from '../../components/OpenLayers/Sources';
import { VectorTileLayer } from '../../components/OpenLayers/Layers/VectorTileLayer';
import { ChartsContainer } from '../../components/Grass/Charts/ChartsContainer';
import { Charts, ChartTypes} from '../../components/Grass/Charts/ChartTypes';
import { chartDataFormat } from '../../components/Grass/Charts/chartDataFormat';
import { highlightSelected } from '../../components/OpenLayers/Filters/highlightSelected';
import { useActiniaAsyncProcess } from '../../components/Grass/Utils/useActiniaAsyncProcess';
import { rDrain } from './rDrain';
import { parsers } from '../../components/Grass/Utils';
import { countyStyle, selectStyle, streamStyle } from '../../components/OpenLayers/Sources/hucBoundaries';
// Locally calculate Upstream Contributing Area
// https://openlayers.org/en/latest/examples/region-growing.html

const Game = ({params}) => {
  const [center, setCenter] = useState([-78.6802,35.8408]);
  const [zoom, setZoom] = useState(11);
  const [basinRaster, setBasinRaster] = useState(null);
  // const [projection, setProjection] = useState('EPSG:4326')
  const [surveyData, setSurveyData] = useState([])
  const [extent, setExtent] = useState(null)
  const [status, setStatus] = useState(null);
  const [resourceId, setResourceId] = useState(null);
  const {lastJsonMessage} = useActiniaAsyncProcess({resourceId, status})
  const [nlcdData, setNlcdData] = useState(null)
  const [basinElevationInfo, setBasinElevationInfo] = useState(null)
  const [loadingAnimation, setLoadingAnimation] = useState(false)
  const [pointSource, setPointSouce] = useState(VectorSource({noWrap: true}))
  const [selectedBasin, setSelectedBasin] = useState(null)
  // const wms3depSource = ned3DepSource({layer: 'Hillshade Multidirectional'})
  const [surveySource, setSurveySource] = useState(survey(loadSurveyData))
  const [isSurveyDataLoaded, setIsSurveyDataLoaded] = useState(false)
  const [osmSource, setOsmSource] = useState(osm()); 
  const basinStyle = vectorStyles.Polygon
  const [selectedHuc12, setSelectedHuc12] = useState(null)
  // let selectedHuc12 = {}
  let nlcdsource = useNLCDSource({year:'2019', dataType:'land_cover', region:'L48'});
  const [selectedHuc12Props, setSelectedHuc12Props]  = useState(null);
  let huc12Source = useVectorTileSource({
    layerName: "savana:huc_12",//"savana:counties_per_huc12",//"savana:huc_12",
    // baseUrl:`http://localhost:8600/geoserver/gwc/service/`,
    baseUrl:`http://localhost:8600/geoserver/gwc/service/wmts`,

    projection:'EPSG:4326'
  })

  let countySource = useVectorTileSource({
    layerName:"savana:cb_2018_us_county_500k",
    // baseUrl:`http://localhost:8600/geoserver/gwc/service/`,
    baseUrl:`http://localhost:8600/geoserver/gwc/service/wmts`,
    projection: 'EPSG:4326'
  })

  let streamSource = useVectorTileSource({
    layerName:"savana:usgs_3dep_30m_streams",
    // baseUrl:`http://localhost:8600/geoserver/gwc/service/`,
    baseUrl:`http://localhost:8600/geoserver/gwc/service/wmts`,
    projection: 'EPSG:4326'
  })


    const onPointerMoveEnd = (e) => {
      // "HUC12_VT"
      // console.log("onPointerMoveEnd: e", e)

      if (selectedBasin !== null) {
        selectedBasin.setStyle(undefined);
        setSelectedBasin(null);
      }
      let updateLayer = false;
      let huc12SelectionToUpdate = null
      let updatedSelection = {}
      e.target.getLayers().forEach((el) => {
        if (el.get('name') === 'seletedHuc12') {
          huc12SelectionToUpdate = el;
        }
        if (el.get('name') === "HUC12_VT") {
          // console.log("onPointerMoveEnd HUC12_VT", el, el.getProperties())
          e.map.forEachFeatureAtPixel(e.pixel, function (f, layer) {
            // console.log("here",f, layer)
            let properties = f.getProperties()

            // console.log(`onPointerMoveEnd: ${properties.layer}: ${properties.name}`)
              if (properties.layer === 'huc_12') {
                let fid = f.getId();
                updateLayer = true;
              
                if (properties.huc12 !== selectedHuc12) {
                  let nlcdYear = 2019
                 
                  // Test the use of geoblaze here to run in browser stats opperations
                  console.log(f.constructor)
                  // console.log("f:", f.getGeometry().getFlatCoordinates().reduce((previousValue, currentValue) => [previousValue, currentValue],[]))
                  const url = `https://storage.googleapis.com/tomorrownow-actinia-dev/nlcd/nlcd_${nlcdYear}_cog.tif`;
                  // const getMode = async () => {
                   
                  //   let geom = new GeoJSON().writeFeature(f, {
                  //     dataProjection: 'EPSG:4326', 
                  //     featureProjection: 'EPSG:5070' 
                  //   })
                  //   console.log("Geometry:", geom)
                  //   const results = await geoblaze.mode(url,  geom);
                    
                  //   console.log("NLCD Mode:", results)
                  // }
                  // getMode()
                  
                }
                 
               
                  
               



                  if (updateLayer) {
                    setSelectedHuc12(properties.huc12)

                    setSelectedHuc12Props(properties)
                    e.target.getLayers().forEach((el) => {
                      if (el.get('name') === 'seletedHuc12') {
                        el.setStyle((feature) => {
                          if (feature.getProperties().huc12 === selectedHuc12) {
                            return selectStyle;
                          }
                        })
                        console.log("Trigger Change", el)
                        el.changed()
                      }
                    })
                  }

                // }
                
              }
          });
         
        }
      })

      
      

      

    }

    const onMoveEventHandler = useCallback((e) => {
      e.preventDefault()
      const view = e.target.getView()
      const _extent = view.calculateExtent()
      setExtent(extent)
      e.target.getLayers().forEach((el) => {

        if (el.get('name') === "survey") {
        
          let properties = []
          el.getSource().forEachFeatureInExtent(_extent, (f) => {
            properties.push(f.getProperties())
          })
          console.log("onMoveEnd properites: ", properties)
          if (!properties) return;

          let grouped = parsers.groupBy(properties,'how_serious_is_this_problem')
       
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

    }, [extent])

    const surveyClickEvent = useCallback((e) => {
   
      console.log("VectorLayer Click Event:", e)
      e.preventDefault()
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
      
      async function runProcess(coords, extent) {
        setBasinRaster(null)
        let data = await rDrain(coords, extent)
        console.log("response:", data)             
        setResourceId(data.response.resource_id)
        setStatus(data.response.status)
        
      }
      runProcess(e.coordinate, extent)
      
    }, [])


    function loadSurveyData(surveySource) {
      if (!surveySource) return;
      if (isSurveyDataLoaded) return;
      console.log("Survey Source: ", surveySource)
      let properties = surveySource.target.getFeatures().map(f => {
        return f.getProperties()
      })

      
      if (!properties.length) return;
      console.log("Survey Source Properties: ", properties)
      let grouped = parsers.groupBy(properties,'how_serious_is_this_problem')
  
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
      if (lastJsonMessage.message !== 'finished') return;

      console.log("Last Message Finished: ", lastJsonMessage)
          
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

       
              // chartDataFormat(rawnlcdData)
              setNlcdData(rawnlcdData)
            console.log("Raw NLCD Summary Data", rawnlcdData)
          }
          setLoadingAnimation(false)
          setBasinRaster("point_basin")

         
   
  }, [lastJsonMessage]);

  const nlcdTotalArea = (data) => {
    const areaList = data.filter(c=> c.catDetails).map(c=>c.area).reduce((a,b) => parseFloat(a) + parseFloat(b))
    return areaList.toFixed(2)
  }
  
        return (
          <Container fluid className="bg-light text-dark">
              
            <Row>
              <Col md={6}>
                <Map mapClass="map-fullscreen" center={center} zoom={zoom} projection='EPSG:4326'>
                  <Layers>
                      {/* <TileLayer source={wms3depSource} opacity={0.5} ></TileLayer> */}
                      
                      <TileLayer source={nlcdsource} opacity={0.75}></TileLayer>
                      <TileLayer source={osmSource} opacity={0.5}></TileLayer>
                      <VectorTileLayer 
                        layerName="streams"
                        zIndex={1}
                        minZoom={10}
                        declutter={true}
                        renderMode="vector"
                        style={streamStyle()}
                        source={streamSource}
                      />
                       {/* <WebGLTileLayer 
                        layerName="nlcd2019" 
                        preload={12}
                        cacheSize={1024}
                        // style={{color: nlcdColors.webGLColors}}
                        // color={nlcdColors.webGLColors}
                        source={nlcdCOGSource({layer: 2019})} 
                        onPostRender={highlightSelected}
                        opacity={0.40} 
                        zIndex={1}/>  */}

                      
                      {/* <TileLayer zIndex={5} source={new TileDebug()}></TileLayer> */}
                      {
                        basinRaster ? 
                        <VectorLayer
                          layerName="basin"
                          style={basinStyle}
                          source={basinResponseSource}
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
                        renderMode="hybrid"
                        style={hucStyle()}
                        source={huc12Source}
                      />

                      <VectorTileLayer 
                        layerName="seletedHuc12" 
                        renderMode="vector"
                        source={huc12Source} 
                        style={(feature) => {
                          if (true === false) {
                            return selectStyle;
                          }
                        }}
                      />

                      <VectorTileLayer 
                        layerName="counties"
                        zIndex={1}
                        minZoom={8}
                        declutter={true}
                        renderMode="vector"
                        style={countyStyle()}
                        source={countySource}
                      />

                      <VectorTileLayer 
                        layerName="streams"
                        zIndex={1}
                        minZoom={8}
                        declutter={true}
                        renderMode="vector"
                        style={streamStyle()}
                        source={streamSource}
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
                    {/* Temporarily Broken by upgrade to ol 7.1 */}
                    {/* <AnimatedCanvasOverlay acanvas={animatedCanvas.rain} visible={loadingAnimation}/>
                    <AnimatedCanvasOverlay acanvas={animatedCanvas.clouds} visible={loadingAnimation}/> */}
                  </Overlays>

                  <Events>
                    {/* <OnMapEvent eventName='postrender' eventHandler={onPostRenderEvent}></OnMapEvent> */}
                    <OnMapEvent eventName='click' eventHandler={surveyClickEvent}></OnMapEvent>
                    <OnMapEvent eventName='moveend' eventHandler={onMoveEventHandler}></OnMapEvent>
                    <OnMapEvent eventName='pointermove' eventHandler={onPointerMoveEnd}></OnMapEvent>
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
                <h2>{selectedHuc12Props ? selectedHuc12Props.name: ""}</h2>             
                  { 
                    nlcdData ? 
                  <Row className="bg-alert text-dark">
                    <Card bg="bg-secondary-light" text="dark">
                    <Card.Body>
                      <Card.Title>Upstream Land Use Characteristics</Card.Title>
                      <Card.Subtitle key="elev-total-area"><strong>Total Area: </strong> {nlcdTotalArea(nlcdData)} km<sup>2</sup></Card.Subtitle>
                      <Card.Subtitle key={`melev`}><strong>Mean Elevation: </strong> {parseFloat(basinElevationInfo.map(e=>e.mean)).toFixed(2)}m <span>&#177;</span> {parseFloat(basinElevationInfo.map(e=>e.stddev)).toFixed(2)}</Card.Subtitle>
                      <Card.Subtitle  key={`relev}`}><strong>Min - Max Elevation: </strong>{parseFloat(basinElevationInfo.map(e=> e.min)).toFixed(2)}m - {parseFloat(basinElevationInfo.map(e=>e.max)).toFixed(2)}m</Card.Subtitle>
                    </Card.Body>
                    <div style={{backgroundColor: "white"}}>
                    <ChartsContainer 
                      options={[ChartTypes.BAR, ChartTypes.LINE, ChartTypes.AREA]}
                      data={chartDataFormat(nlcdData)} 
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
                  <Row>
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