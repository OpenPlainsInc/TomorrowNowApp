/*
 * Filename: ModelMap.js
 * Project: TomorrowNow
 * File Created: Tuesday October 18th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Sun Nov 13 2022
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
import Controls, {ZoomSliderControl, ScaleLineControl} from '../../../components/OpenLayers/Controls';
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
import ActiniaGeoTiff from '../../../components/OpenLayers/Sources/ActiniaGeoTiff';
import Reprojection from '../../../components/OpenLayers/Views/Reprojection';
import nlcdCats from "../../../components/OpenLayers/Colors/nlcd";
import { protectAreaStyle } from './protectAreaStyles';
export default function ModelMap({devRestrictions, model}) {
    const county_geoids = ['37183', '37063', '37135']
    const PROJECTION = 'EPSG:3857' //'EPSG:5070'
    const EXTENT = [-8824121.708860213, 4234699.40797501,-8711169.383775985, 4334170.940395969]
    const [osmSource, setOsmSource] = useState(osm()); 
    const [center, setCenter] = useState([-8773686.675374346,4287950.809332017]);
    const [zoom, setZoom] = useState(9);

    const interactionSource = useVectorSource({wrapX: false, useSpatialIndex: false})
    const colorChoice = nlcdCats.filterWebGLColors([41,42,43,51,52,71,72,73,74])
    // let countySource = useVectorTileSource({
    //     layerName:"savana:cb_2018_us_county_500k",
    //     baseUrl:`http://localhost:8600/geoserver/gwc/service/wmts`
    //   })
    // Update layer source when dev potential is remove from form.
    devRestrictions.on('remove', (event) => {
        // console.log("Remove Event", event)
        // let collection = interactionSource.getFeaturesCollection()
        // console.log("Collection:", collection)
        // console.log("Collection Length:", collection.getLength())
        // let features = interactionSource.getFeatures()
        // console.log("features:", features)
        interactionSource.removeFeature(event.element)
        // interactionSource.refresh({force:true})
    })

    return (
        
        <Map 
            projection={PROJECTION} 
            mapClass="model-map-fullscreen" 
            center={center} 
            zoom={zoom}
        >
            <Layers>
                <TileLayer source={osmSource} opacity={1.0}></TileLayer>
                <VectorLayer layerName={"development_potential"}
                     source={interactionSource}
                    style={((f) => {
                        const value = f.get("value") || "0.0";
                        // const value =  "0.99";
                        return protectAreaStyle(value, f.getId())
                    })}     
                />
                { model.data ? 
                    <>
                    <ActiniaGeoTiff
                        rasterName={"nlcd_2019_cog"}
                        locationName={model.data.properties.location}
                        mapsetName={"PERMANENT"}
                        color={'grass'}
                        opacity={0.2}
                    />
                    <ActiniaGeoTiff
                        rasterName={"nlcd_2019_cog"}
                        locationName={model.data.properties.location}
                        mapsetName={"PERMANENT"}
                        color={colorChoice}
                    /> 
                    </>
                    : null
                }
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
            
            <Reprojection epsg='5070'></Reprojection> 
        </Map>

    )
}