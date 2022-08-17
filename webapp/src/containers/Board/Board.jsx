/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/containers/Board/Board.jsx
 * Project: TomorrowNow
 * File Created: Wednesday March 16th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: We/08/yyyy 05:nn:21
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


import React, { useState, useEffect} from "react"
import {useParams, useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import FormControl from "react-bootstrap/FormControl"
import InputGroup from "react-bootstrap/InputGroup"
import GrassSelect from "../../components/Grass/Utils/GrassSelect";
import Grass from "../../components/Grass/grass";
import { GrassDataTypeSelect } from "../../components/Grass/Utils";
import { LayerItemCard } from "../../components/Grass/Layers/LayerItemCard";


const Board = () => {
    let navigate = useNavigate()
    let {locationId, mapsetId} = useParams();
    const DEFAULT_LOCATION = "nc_spm_08"
    const DEFAULT_MAPSET = "PERMANENT"
    const [rasters, setRasters] = useState(null)
    const [filter, setFilter] = useState(undefined)
    const [filteredRasters, setFilteredRasters]  = useState([])
    const [chunks, setChunks]  = useState([])
    const [locationValue, setLocationValue]  = useState(locationId || DEFAULT_LOCATION)
    const [dataTypeValue, setDataTypeValue]  = useState("raster")
    const [mapsetValue, setMapsetValue]  = useState(mapsetId  || DEFAULT_MAPSET)
    const [chunkSize, setChunkSize]  = useState(4)


    useEffect(()=> {
      if (!locationId || !mapsetId) {
        navigate(`/board/location/${locationValue}/mapset/${mapsetValue}`);
      }
    }, [navigate, locationValue, mapsetValue, locationId, mapsetId])

    useEffect(() => {
        let isMounted = true; 
        async function fetchRasters() {
            // if (!isMounted) return null;
            try {
              let data = null;
                if (dataTypeValue === 'raster') {
                    data = await Grass.locations.location.mapsets.getRasterLayers(locationValue, mapsetValue)
                }
                else if (dataTypeValue === 'vector') {
                    data = await Grass.v.layers(locationValue, mapsetValue)
                }
                else {
                  throw new Error('Improper data type set')
                }

                console.log("Raster response:", data)
                const rastersData = data.response.process_results
                console.log("rastersData:", rastersData)
                if (isMounted) setRasters(rastersData)
              } catch (e) {
                console.log(e);
            }
            return () => { isMounted = false }
        }
        fetchRasters()
      }, [dataTypeValue])


      useEffect(()=> {
        if (!rasters) return;
        setFilteredRasters(rasters.filter(f => f.includes(filter) || filter === ""))
        console.log("Set Filter", filteredRasters)
        let _chunks = filteredRasters.length > 0 ? sliceIntoChunks(filteredRasters, chunkSize) : sliceIntoChunks(rasters,4)
        setChunks(_chunks)
        console.log("Set Filter chunks", chunks)

      },[rasters, filter, chunkSize])


      const sliceIntoChunks = (arr) => {
        const _chunkSize = chunkSize
        const res = [];
        for (let i = 0; i < arr.length; i += _chunkSize) {
            const _chunk = arr.slice(i, i + _chunkSize);
            res.push(_chunk);
        }
        return res;
      }

      const filterData = (e) => {
        const keyword = e.target.value;
        setFilter(keyword)
        let searchFilter = rasters.filter(f => f.includes(filter) || filter === "")
        setFilteredRasters(searchFilter)
        let _chunks = searchFilter.length > 0 ? sliceIntoChunks(searchFilter) : sliceIntoChunks(rasters)
        setChunks(_chunks)
      }

      async function fetchUpdate(locationValue, mapsetValue) {
        console.log(`Updated Data for Location ${locationValue} @ Mapset ${mapsetValue}`)

        let data =  await Grass.locations.location.mapsets.getRasterLayers(locationValue, mapsetValue)
        console.log("updated Raster response:", data)
        const rastersData = data.response.process_results
        console.log("updated rastersData:", rastersData)
        setRasters(rastersData)
      }

      useEffect(()=> {
        fetchUpdate(locationValue, mapsetValue)
      },[mapsetValue,locationValue])

      function updateMapset(e) {
        setRasters(null)
        setChunks([])
        let newValue = e.target.value
        console.log("Update Mapset and Params:", e, locationValue, newValue)
        setMapsetValue(newValue);
        navigate(`/board/location/${locationValue}/mapset/${newValue}`);
      }

      function updateLocation(e) {
        
        let newValue = e.target.value
        setRasters(null)
        setChunks([])
        // setProcessChainList([])

        setMapsetValue(DEFAULT_MAPSET)
        setLocationValue(newValue)
        console.log("Update Location and Params:", e, newValue, DEFAULT_MAPSET)
        navigate(`/board/location/${newValue}/mapset/${DEFAULT_MAPSET}`);
        // fetchUpdate(locationValue, mapsetValue)
      }

      function updateDataType(e) {
        console.log("Update Datatype:", e)
        let newValue = e.target.value
        setRasters(null)
        setChunks([])
        setDataTypeValue(newValue)
      }

      const renderRasters = (rasters) => {

          console.log("renderRasters:",chunks )
          console.log("renderRasters Filter:",filter )
          console.log("renderRasters Filtered Rasters:",filteredRasters)

          return chunks.map(rowdata => {
            return(
                <Row key={rowdata.join()} className="d-flex flex-row bd-highlight mb-2">
                    {rowdata.map(raster => {
                        return( 
                            <Col key={raster}  xs={12} md={3} lg={3}>
                              <LayerItemCard
                                title={raster}
                                datatype={dataTypeValue}
                                locationName={locationValue}
                                mapsetName={mapsetValue}
                              /> 
                            </Col>
                        )
                    })}        
            </Row>)
          });

      };
  
        return (
            <Container fluid className="bg-light text-dark">
                <Row>
                  <Col>
                 <InputGroup className="mb-3" style={{marginTop: 20}}>
                    <InputGroup.Text id="basic-addon1"><i className="fa-solid fa-magnifying-glass"></i></InputGroup.Text>
                    <FormControl
                    placeholder="Search Data"
                    aria-label="Search"
                    aria-describedby="basic-addon1"
                    onChange={filterData}
                    />
                </InputGroup>
                  </Col>

                  <Col>
                      <GrassSelect selectionType="locations" onSelect={updateLocation} location={locationValue}></GrassSelect>
                  </Col>

                  <Col>
                      <GrassSelect selectionType="mapsets" onSelect={updateMapset} location={locationValue} mapset={mapsetValue}></GrassSelect>
                  </Col>
                  <Col>
                    <GrassDataTypeSelect onSelect={updateDataType}></GrassDataTypeSelect>
                  </Col>
                </Row>
                <Row>
                {rasters ? renderRasters(rasters): []}
                </Row>
            </Container>
        
        )
 
  }


export default Board