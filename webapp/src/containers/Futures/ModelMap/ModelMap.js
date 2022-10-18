/*
 * Filename: ModelMap.js
 * Project: TomorrowNow
 * File Created: Tuesday October 18th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Tue Oct 18 2022
 * Modified By: Corey White
 * -----
 * License: GPLv3
 * 
 * Copyright (c) 2022 TomorrowNow
 * 
 * TomorrowNow is an open-source geospatial participartory modeling platform
 * to enable stakeholder engagment in socio-environmental decision-makeing.
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 * 
 */
import './model-map.scss'
import {useState, useEffect} from 'react'
import Map from '../../../components/OpenLayers/Map';
import Controls, {FullScreenControl, ZoomSliderControl, ScaleLineControl} from '../../../components/OpenLayers/Controls';
import Layers from '../../../components/OpenLayers/Layers/Layers';
import TileLayer from "../../../components/OpenLayers/Layers/TileLayer"

import osm from "../../../components/OpenLayers/Sources/osm";
import ScenarioControls, { ScenarioControl } from '../../../components/Grass/Controls/Scenarios';
import { Draw, Interactions } from '../../../components/OpenLayers/Interactions';
import { useVectorSource } from '../../../components/OpenLayers/Sources/VectorSource';
import VectorLayer from '../../../components/OpenLayers/Layers/VectorLayer';
import { useVectorTileSource } from '../../../components/OpenLayers/Sources';
import { VectorTileLayer } from '../../../components/OpenLayers/Layers/VectorTileLayer';
import { countyStyle } from '../countySelectStyle';
import Collection from 'ol/Collection'

export default function ModelMap({devRestrictions}) {
    const county_geoids = ['37183', '37063', '37135']
    const PROJECTION = 'EPSG:3857' //'EPSG:5070'
    const EXTENT = [-8824121.708860213, 4234699.40797501,-8711169.383775985, 4334170.940395969]
    const [osmSource, setOsmSource] = useState(osm()); 
    const [center, setCenter] = useState([-8773686.675374346,4287950.809332017]);
    const [zoom, setZoom] = useState(9);

    // let countySource = useVectorTileSource({
    //     layerName:"savana:cb_2018_us_county_500k",
    //     baseUrl:`http://localhost:8600/geoserver/gwc/service/wmts`,
    //     epsg: PROJECTION
    //   })
    // const devRestrictionsCollection = new Collection()
   
   

    // const [devRestrictions, setDevRestrictions] = useState(devRestrictionsCollection);
    // devRestrictions.on('add', (e, index, target, type) => {
    //     e.preventDefault()
    //     console.log(e.element, e.index, e.target, e.ype)
    //     console.log(devRestrictions.item(e.index))
    //     console.log(e.target)
    //     e.target.forEach((f) => console.log(f.getGeometry().getArea() / 1e6))
    // })
    // devRestrictions.on('remove', (element, index, target, type) => console.log(element, index, target, type))
    // devRestrictions.on('change', (element, index, target, type) => console.log(element, index, target, type))
    // devRestrictions.on('error', (element, index, target, type) => console.log(element, index, target, type))
    const interactionSource = useVectorSource({wrapX: false})

    

    // useEffect(() => {
    //     const currentDevelopmentRestrictions = () => {
    //         // let features = interactionSource.getFeatures()
    //         devRestrictions.forEach(f => console.log(f))
    //         // console.log(features)
    //     }
    //     currentDevelopmentRestrictions()
    // }, [devRestrictions])
    

    return (
        
        <Map 
            projection={PROJECTION} 
            mapClass="map-fullscreen" 
            center={center} 
            zoom={zoom}
            extent={EXTENT}
        >
            <Layers>
                <TileLayer source={osmSource} opacity={0.5}></TileLayer>
                <VectorLayer source={interactionSource}/>
                {/* <VectorTileLayer 
                    layerName="seletedCounties" 
                    renderMode="vector"
                    source={countySource} 
                    style={(feature) => {
                        if (feature.getProperties().geoid in [county_geoids]) {
                            return countyStyle;
                        }
                        }}
                    /> */}
            </Layers>

            <Interactions>
                <Draw 
                    source={interactionSource}
                    features={devRestrictions}
                    type="MultiPolygon"
                    isActive={true}
                />
            </Interactions>

            <Controls>
                <ZoomSliderControl />
                <ScaleLineControl />
                {/* <ScenarioControls>
                    <ScenarioControl/>
                </ScenarioControls> */}
            </Controls>
        </Map>

    )
}