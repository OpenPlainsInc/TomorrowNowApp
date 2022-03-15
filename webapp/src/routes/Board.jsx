import React, { useState, useEffect, useRef } from "react"
import {Outlet, Link } from "react-router-dom";
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"


const RasterCardImage = ({raster}) => {
    const [image, setImage] = React.useState(null);
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
                // return rasterImage
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
        <Card.Img as="img" variant="top" src={image ? image.imgurl : ""} />
      )

};


const Board = (props) => {
    const [rasters, setRasters] = useState([])
    const [processChainList, setProcessChainList] = useState([])
    const [rasterImages, setRasterImages] = useState([])


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

      useEffect(() => {
        let isMounted = true; 
        async function fetchImage(raster_name) {
            try {
                // let queryParams = {un: params.unId}
                let url = new URL(`http://localhost:8005/savana/r/renderpng/${raster_name}/PERMANENT`)
                // url.search = new URLSearchParams(queryParams).toString();
                const res = await fetch(url);
                const data = await res.json();
                console.log("response:", data)
                data.response.imgurl = `data:image/png;base64,${data.response.imagedata}`
                const rasterImage = data.response
                setRasterImages([rasterImage].concat(rasterImages))
                // return rasterImage
              } catch (e) {
                console.log(e);
            }
            return () => { isMounted = false }
          }
          console.log("Loaded Rasters: ", rasters)
          rasters.map(r => fetchImage(r))
      },[rasters])

     

      const sliceIntoChunks = (arr, chunkSize) => {
        const res = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            const chunk = arr.slice(i, i + chunkSize);
            res.push(chunk);
        }
        return res;
      }
     

      const renderRasters = (rasters) => {
          let chunks = sliceIntoChunks(rasters,4)
          console.log("renderRasters:",chunks )
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
                                        {rasterImages.filter(img => img.raster_name === raster).imgurl || "Sup"}
                                    </Card.Text>
                                    <Card.Link href="#">Map</Card.Link>
                                    <Card.Link href="#">Metadata</Card.Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })}        
            </Row>)
          });

      };
  
        return (
            <Container fluid>
                <Row>
                {rasters ? renderRasters(rasters): []}
                </Row>
            </Container>
        
        )
 
  }


export default Board