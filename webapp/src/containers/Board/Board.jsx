/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/containers/Board/Board.jsx
 * Project: TomorrowNow
 * File Created: Wednesday March 16th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Tu/04/yyyy 03:nn:07
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


import React, { useState, useEffect, useRef, Fragment} from "react"
import {Outlet, Link } from "react-router-dom";
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Spinner from "react-bootstrap/Spinner"
import FormControl from "react-bootstrap/FormControl"
import InputGroup from "react-bootstrap/InputGroup"
import {LinkContainer} from 'react-router-bootstrap'


const RasterCardImage = ({raster}) => {
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(true)
    // const mountedRef = useRef(true)
    const [mapset, setMapset] = useState('PERMANENT')

    useEffect(() => {
        let isMounted = true; 
        async function fetchImage(raster_name) {
            try {
                // let queryParams = {un: params.unId}
                let url = new URL(`http://localhost:8005/savana/r/renderpng/${raster_name}/${mapset}`)
                // url.search = new URLSearchParams(queryParams).toString();
                const res = await fetch(url);
                const data = await res.json();
                console.log("image response:", data)
                data.response.imgurl = `data:image/png;base64,${data.response.imagedata}`
                const rasterImage = data.response
                setImage(rasterImage)
               
                setLoading(false)
              } catch (e) {
                console.log(e);
            }
            
          }
          fetchImage(raster)
      },[raster])

      useEffect(() => {
        return () => { 
          // mountedRef.current = false
        }
      }, [])

     
      return (
        <Fragment >
            {
                loading ? 
                <Spinner as="span" animation="border" role="status" variant="secondary" className="bg-dark text-light" >
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                :
                <Card.Img as="img" variant="top" src={image ? image.imgurl : ""} className="bg-dark text-light"/>
            }
        </Fragment>
      )

};


const Board = (props) => {
    const [rasters, setRasters] = useState([])
    const [processChainList, setProcessChainList] = useState([])
    const [filter, setFilter] = useState(null)
    const [filteredRasters, setFilteredRasters]  = useState([])
    const [chunks, setChunks]  = useState([])


    useEffect(() => {
        let isMounted = true; 
        async function fetchRasters() {
            try {
                // let queryParams = {un: params.unId}
                let url = new URL('http://localhost:8005/savana/g/list/')
                // let url = new URL('http://api:8005/savana/g/list/')

                // url.search = new URLSearchParams(queryParams).toString();
                const res = await fetch(url);
                const data = await res.json();
                console.log("response:", data)
                const rastersData = data.response.process_results
                console.log("rastersData:", rastersData)
                setProcessChainList(data.response.process_chain_list)
                if (isMounted) setRasters(rastersData)
              } catch (e) {
                console.log(e);
            }
            return () => { isMounted = false }
        }
        fetchRasters()
      }, [])


      useEffect(()=> {
        setFilteredRasters(rasters.filter(f => f.includes(filter) || filter === ""))
        console.log("Set Filter", filteredRasters)
        let _chunks = filteredRasters.length > 0 ? sliceIntoChunks(filteredRasters,4) : sliceIntoChunks(rasters,4)
        setChunks(_chunks)
        console.log("Set Filter chunks", chunks)

      },[rasters,filter])


      const sliceIntoChunks = (arr) => {
        const chunkSize = 4
        const res = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            const _chunk = arr.slice(i, i + chunkSize);
            res.push(_chunk);
        }
        return res;
      }

      const filterData = (e) => {
        const keyword = e.target.value;
        setFilter(keyword)
        let searchFilter = rasters.filter(f => f.includes(filter) || filter === "")
        setFilteredRasters(searchFilter)
        // .map(sliceIntoChunks)
        let _chunks = searchFilter.length > 0 ? sliceIntoChunks(searchFilter) : sliceIntoChunks(rasters)
        setChunks(_chunks)
      }

     

      const renderRasters = (rasters) => {
        //   setFilteredRasters(rasters.filter(f => f.includes(filter) || filter === ""))

          console.log("renderRasters:",chunks )
          console.log("renderRasters Filter:",filter )
          console.log("renderRasters Filter:",filteredRasters)

          return chunks.map(rowdata => {
            return(
                <Row key={rowdata.join()} className="d-flex flex-row bd-highlight mb-2">
                    {rowdata.map(raster => {
                        return( 

                            <Col key={raster}  xs={6} md={3} lg={3}>
                                <Card  key={raster} >
                                    <RasterCardImage raster={raster} />
                                    <Card.Body>
                                    <Card.Title>{raster}</Card.Title>
                                    <Card.Subtitle className="mb-4 text-muted">Data Type : {processChainList[0][1].inputs.type}</Card.Subtitle>
                                    <Card.Text>
                                        { `Mapset: ${processChainList[0][1].inputs.mapset}`}
                                    </Card.Text>
                                    <LinkContainer to={`/board/map/${raster}`}> 
                                        <Card.Link >Map</Card.Link>
                                    </LinkContainer>
                                    <LinkContainer to={`/board/${raster}`}> 
                                        <Card.Link >Metadata</Card.Link>
                                    </LinkContainer>
                                    
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })}        
            </Row>)
          });

      };
  
        return (
            <Container fluid className="bg-light text-dark">
                <Row>
                 <InputGroup className="mb-3" style={{marginTop: 20}}>
                    <InputGroup.Text id="basic-addon1"><i className="fa-solid fa-magnifying-glass"></i></InputGroup.Text>
                    <FormControl
                    placeholder="Search Data"
                    aria-label="Search"
                    aria-describedby="basic-addon1"
                    onChange={filterData}
                    />
                </InputGroup>
                </Row>
                <Row>
                {rasters ? renderRasters(rasters): []}
                </Row>
            </Container>
        
        )
 
  }


export default Board