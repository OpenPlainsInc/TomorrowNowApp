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
    const mountedRef = useRef(true)

    useEffect(() => {
        let isMounted = true; 
        async function fetchImage(raster_name) {
            try {
                // let queryParams = {un: params.unId}
                let url = new URL(`http://localhost:8005/savana/r/renderpng/${raster_name}/PERMANENT`)
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
          mountedRef.current = false
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

      },[rasters])


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
        setFilteredRasters(rasters.filter(f => f.includes(filter) || filter === ""))
        // .map(sliceIntoChunks)
        let _chunks = filteredRasters.length > 0 ? sliceIntoChunks(filteredRasters) : sliceIntoChunks(rasters)
        setChunks(_chunks)
      }

      useEffect(()=>{
        
      },[rasters])
     

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
                                    <Card.Link href="#">Map</Card.Link>
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
                 <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
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