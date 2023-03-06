/*
 * Filename: ModelMap.js
 * Project: TomorrowNow
 * File Created: Tuesday October 18th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Fri Mar 03 2023
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
import Controls, {ZoomSliderControl, ScaleLineControl, LayerSwitcherControl, LegendControl} from '../../../components/OpenLayers/Controls';
import Layers from '../../../components/OpenLayers/Layers/Layers';
import TileLayer from "../../../components/OpenLayers/Layers/TileLayer"

import osm from "../../../components/OpenLayers/Sources/osm";
import ScenarioControls, { ScenarioControl } from '../../../components/Grass/Controls/Scenarios';
import { Draw, Interactions } from '../../../components/OpenLayers/Interactions';
import { useVectorSource } from '../../../components/OpenLayers/Sources/VectorSource';
import VectorLayer from '../../../components/OpenLayers/Layers/VectorLayer';
import { useVectorTileSource } from '../../../components/OpenLayers/Sources';
// import { useCountyVectorTiles } from '../../../components/OpenLayers/Sources/VectorTileSource';

import { VectorTileLayer } from '../../../components/OpenLayers/Layers/VectorTileLayer';
import { countyStyle, countiesStyleWithLabel } from '../countySelectStyle';
import Collection from 'ol/Collection'
import ActiniaGeoTiff from '../../../components/OpenLayers/Sources/ActiniaGeoTiff';
import Reprojection from '../../../components/OpenLayers/Views/Reprojection';
import nlcdCats from "../../../components/OpenLayers/Colors/nlcd";
import { protectAreaStyle } from './protectAreaStyles';
export default function ModelMap({devRestrictions, model}) {
    const county_geoids = ['37183', '37063', '37135']
    const PROJECTION = 'EPSG:3857' //'EPSG:5070'
    const EXTENT = [-8824121.708860213, 4234699.40797501,-8711169.383775985, 4334170.940395969]
    const [osmSource] = useState(osm()); 
    const [center] = useState([-8773686.675374346,4287950.809332017]);
    const [zoom] = useState(9);

    const interactionSource = useVectorSource({wrapX: false, useSpatialIndex: false})
    // const colorChoice = nlcdCats.filterWebGLColors([41,42,43,51,52,71,72,73,74])
    const colorChoice = nlcdCats.developWebGLColors([41,42,43,51,52,71,72,73,74])
    let countySource = useVectorTileSource({
        layerName:"savana:cb_2018_us_county_500k",
        baseUrl:`http://localhost:8600/geoserver/gwc/service/wmts`
      })
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
               
                { model.data ? 
                    <>
                    {/* <ActiniaGeoTiff
                        rasterName={"nlcd_2019_cog"}
                        locationName={model.data.properties.location}
                        mapsetName={"PERMANENT"}
                        color={'grass'}
                        opacity={1}
                    /> */}
                 
{/* https://storage.googleapis.com/tomorrownow-actinia-dev/SpatialData/climate/flood/CONUS_FDP_100m_cog.tif */}
                    {/* <ActiniaGeoTiff
                        rasterName={"nlcd_2019_cog"}
                        locationName={model.data.properties.location}
                        mapsetName={"PERMANENT"}
                        color={ [
                            "case",
                            ['==', ['band', 1], 1], //Developed Orange
                            "rgba(153,142,195,1.0)", 
                            ['==', ['band', 1], -1], // Undeveloped Purple
                            'rgba(153,142,195,1.0)',
                            'rgba(0,0,0,0.0)'
                            ]}
                        opacity={0.5}
                    />  */}
                    {/* <ActiniaGeoTiff
                        rasterName={"final"}
                        locationName={model.data.properties.location}
                        mapsetName={"PERMANENT"}
                        color={ [
                            "case",
                            ['==', ['band', 1], -1], //Developed Orange
                            // "#f1a340", 
                            'rgba(153,142,195,1.0)',
                            ['==', ['band', 1], 0], // Undeveloped Purple
                            'rgba(153,142,195,0.0)',
                            'rgba(0,0,0,0.0)'
                            ]}
                        opacity={0.75}
                    />  */}

                    {/* <ActiniaGeoTiff
                        rasterName={"depth"}
                        locationName={model.data.properties.location}
                        mapsetName={"simwe"}
                        color={'grass'}
                        opacity={0.2}
                    /> */}
                     
                    <ActiniaGeoTiff
                        rasterName={"nlcd_2019_cog"}
                        locationName={model.data.properties.location}
                        mapsetName={"PERMANENT"}
                        color={colorChoice}
                    /> 
                   

                {/* <VectorTileLayer 
                    layerName="counties" 
                    renderMode="vector"
                    source={countySource} 
                    style={countiesStyleWithLabel}
                    declutter={true}
                    // style={(feature) => {
                    //     console.log(feature.getStyleFunction())
                    //     let geoids = model.data.properties.counties.map(c=>c.county.geoid)
                    //     if (geoids.includes(feature.getProperties().geoid.toString())) {
                    //         return countyStyle
                    //     }
                    //     }}
                    /> */}
                 
                    </>
                    : null
                }
                <VectorLayer layerName={"development_potential"}
                     source={interactionSource}
                     zIndex={99}
                    style={((f) => {
                        const value = f.get("value") || "0.0";
                        // const value =  "0.99";
                        return protectAreaStyle(value, f.getId())
                    })}     
                />
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
                {/* <LayerSwitcherControl/> */}
                {/* <LegendControl></LegendControl> */}
            </Controls>
            
            {/* <Reprojection epsg='3857'></Reprojection>  */}
            <Reprojection epsg='5070'></Reprojection> 
        </Map>

    )
}