import React, { useState, useEffect } from "react"
import {Outlet, Link } from "react-router-dom";
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"


const Board = (props) => {
    const [rasters, setRasters] = useState()
    const [processChainList, setProcessChainList] = useState()


    useEffect(() => {
        let isMounted = true; 
        async function fetchRasters() {
            try {
                // let queryParams = {un: params.unId}
                let url = new URL('http://localhost:8005/world/info/')
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
                                    <Card.Body>
                                    <Card.Title>{raster}</Card.Title>
                                    <Card.Subtitle className="mb-4 text-muted">Data Type : {processChainList[0][1].inputs.type}</Card.Subtitle>
                                    <Card.Text>
                                        { `Mapset: ${processChainList[0][1].inputs.mapset}`}
                                    </Card.Text>
                                    <Card.Link href="#">View Metadata</Card.Link>
                                    {/* <Card.Link href="#">Another Link</Card.Link> */}
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
                {rasters ? renderRasters(rasters): []}
           
            <nav>
            <Link to="/">Home</Link> | {" "}
            <Link to="/world">World</Link> | {" "}
            <Link to="/dashboard">Dashboard</Link>
           </nav>
           <Outlet />
            </Container>
        
        )
 
  }


export default Board