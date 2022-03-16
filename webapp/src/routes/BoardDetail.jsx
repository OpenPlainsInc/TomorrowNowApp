import React, { useState, useEffect, useRef, Fragment} from "react"
import {useParams, useLocation } from "react-router-dom";

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import Spinner from "react-bootstrap/Spinner"
import Table from "react-bootstrap/Table"
import Image from "react-bootstrap/Image"

const RasterImage = ({raster}) => {
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
                <Image as="img" fluid={true} src={image ? image.imgurl : ""} className="bg-dark text-light"/>
            }
        </Fragment>
      )

};


const BoardDetail = (props) => {
    let params = useParams();
    const location = useLocation()
    // const { from } = location.state
    const [info, setInfo] = useState([])
    


    useEffect(() => {
        let isMounted = true; 
        async function fetchRasterInfo() {
            try {
                let rasterId = params.rasterId
                let url = new URL(`http://localhost:8005/savana/r/info/${rasterId}/PERMANENT`)
                const res = await fetch(url);
                const data = await res.json();
                console.log("response:", data)
                const rastersData = data.response.process_results
               let newRst = Object.entries(rastersData).forEach(([k, v]) => {
                    let newVal = v.replace(/""/g, "")
                    return {k : newVal}
                })
                console.log("rastersData:",newRst, rastersData)
                if (isMounted) setInfo(rastersData)
              } catch (e) {
                console.log(e);
            }
            return () => { isMounted = false }
        }
        fetchRasterInfo()
      }, [])


  
        return (
            <Container fluid className="bg-light text-dark">
                <Row><h1>{info.map}</h1></Row>
                <Row md={2}>
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Details</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Mapset</td>
                                    <td>{info.datatype}</td>
                                </tr>
                                <tr>
                                    <td>Location</td>
                                    <td>{info.location}</td>
                                </tr>
                                <tr>
                                    <td>Database</td>
                                    <td>{info.database}</td>
                                </tr>
                                <tr>
                                    <td>Title</td>
                                    <td>{info.title}</td>
                                </tr>
                                <tr>
                                    <td>Timestep</td>
                                    <td>{info.date}</td>
                                </tr>
                    </tbody>
                    </Table>
                    </Col>
                    <Col>
                        <RasterImage raster={params.rasterId} />
                    </Col>
                </Row>
                <Row md={2}>
                    <Col>
                    <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Details</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Type of Map</td>
                            <td>{info.maptype}</td>
                        </tr>
                        <tr>
                            <td>Data Type</td>
                            <td>{info.datatype}</td>
                        </tr>
                        <tr>
                            <td>Rows</td>
                            <td>{info.rows}</td>
                        </tr>
                        <tr>
                            <td>Columns</td>
                            <td>{info.cols}</td>
                        </tr>
                        <tr>
                            <td>Total Cells</td>
                            <td>{info.cells}</td>
                        </tr>
                    </tbody>
                    </Table>
                    </Col>
                    <Col>
                    <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Creation Details</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Date</td>
                                    <td>{info.date}</td>
                                </tr>
                                <tr>
                                    <td>Creator</td>
                                    <td>{info.creator}</td>
                                </tr>
                    </tbody>
                    </Table>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Data Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{info.description}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Category Details</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Number of Categories</td>
                                    <td>{info.ncats}</td>
                                </tr>
                    </tbody>
                    </Table>
                    </Col>
                </Row>
                <Row>
                    Projection: {}
                </Row>
                <Row md={2}>
                    
                    <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Bounds</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>N = {info.north}</td>
                                <td>S = {info.south}</td>
                            </tr>
                            <tr>
                                <td>E = {info.east}</td>
                                <td>W = {info.west}</td>
                            </tr>
                            <tr>
                                <td>Range of Data</td>
                                <td>{info.min} - {info.max}</td>
                            </tr>
                    </tbody>
                    </Table>
                    </Col>
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Sources</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{info.source1}</td>
                                </tr>
                                <tr>
                                    <td>{info.source2}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Comments</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{info.comments}</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </Table>
                    
                    </Col>
                </Row>
              
            </Container>
        
        )
 
  }


export default BoardDetail