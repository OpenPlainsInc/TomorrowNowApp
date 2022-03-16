// react
import React, { useContext, useState, useEffect } from 'react';
import 'ol/ol.css';

// openlayers
import {Draw, Modify, Snap} from 'ol/interaction';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';

import {Vector as VectorSource} from 'ol/source';
import VectorLayer from 'ol/layer/Vector'
import Dropdown from "react-bootstrap/Dropdown"
import MapContext from "./MapContext";



const MapEditer = ({drawTypes = ["Point", "LineString", "Polygon", "Circle"]}) => {
    const { map } = useContext(MapContext); 
    const [drawVectorSource, setDrawVectorSource] = useState(null)
    const [snap, setSnap] = useState(null)
    const [draw, setDraw] = useState(null)

    const [featureType, setFeatureType] = useState("")
    // const DRAWTYPES = ["Point", "LineString", "Polygon", "Circle"]
 
    const changeFeatureType = (value) => {
        setFeatureType(value)
        if (snap) {
            map.removeInteraction(snap);
            setSnap(null)
        }

        if (draw) {
            map.removeInteraction(draw);
            setDraw(null)
        }
       
    }

    const isActive = (value) => {
        return featureType === value ? true : false
    }


    useEffect(()=>{
        if (!map) return;
        let vectorSouce = new VectorSource()
       
        let vectorDraw = new VectorLayer({
        source: vectorSouce,
        style: new Style({
            fill: new Fill({
            color: 'rgba(255, 255, 255, 0.2)',
            }),
            stroke: new Stroke({
            color: '#ffcc33',
            width: 2,
            }),
            image: new CircleStyle({
            radius: 7,
            fill: new Fill({
                color: '#ffcc33',
            }),
            }),
        }),
        });
        map.addLayer(vectorDraw)

        let modify = new Modify({source: vectorSouce})
        map.addInteraction(modify);
        setDrawVectorSource(vectorSouce)
        return () => map.removeLayer(vectorDraw)

    },[map])

    useEffect(()=>{
        if (!map) return;
        if (drawTypes.includes(featureType)) {
            if (!draw) {
                let _draw = new Draw({
                    source: drawVectorSource,
                    type: featureType,
                });
                setDraw(_draw)
                map.addInteraction(_draw);
            }
           
            if (!snap) {
                let _snap = new Snap({source: drawVectorSource});
                setSnap(_snap)
                map.addInteraction(_snap);
            }
           
        }

    },[map,featureType, draw, snap, drawVectorSource, drawTypes])

    return (
        <Dropdown onSelect={changeFeatureType}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
            Edit Map
        </Dropdown.Toggle>

        <Dropdown.Menu > 
            {drawTypes.map(t => {
                return(<Dropdown.Item key={t} onClick={(e) => {console.log(`Dropdown ${t} Click Event`)}} eventKey={t} active={isActive(t)}>{t}</Dropdown.Item>)
            })}
        </Dropdown.Menu>
        </Dropdown>
    )
 
  }


export default MapEditer