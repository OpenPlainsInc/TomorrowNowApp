import React, { useState, useEffect } from "react"
import {useParams, useLocation } from "react-router-dom";

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Breadcrumb from "react-bootstrap/Breadcrumb"
import Table from "react-bootstrap/Table"
import {LinkContainer} from 'react-router-bootstrap'
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import RasterCardImage from "../../components/Grass/Utils/RasterCardImage";
import Grass from "../../components/Grass/grass";

const BoardDetail = (props) => {
    let params = useParams();
    const location = useLocation()
    const [info, setInfo] = useState([])
    
    useEffect(() => {
        let isMounted = true; 
        async function fetchRasterInfo() {
            try {
                let rasterId = params.rasterId
                let mapsetId = params.mapsetId
                let locationId = params.locationId
                const data = await Grass.r.info(locationId, mapsetId, rasterId)
                console.log("response:", data)
                const rastersData = data.response.process_results
                let updateObject = {}
                Object.entries(rastersData).map(([k, v]) => {
                    console.log("Value", v.split('"').filter(b=> b).pop())
                    let newVal = v.replace(/\"/g, '').toString()
                    updateObject[k] = newVal
                })
                console.log("rastersData:", updateObject)

                console.log("newRst:",updateObject)
                if (isMounted) setInfo(updateObject)
              } catch (e) {
                console.log(e);
            }
            return () => { isMounted = false }
        }
        fetchRasterInfo()
      }, [])


  
        return (
            <Container fluid className="bg-light text-dark">
                <Breadcrumb style={{paddingTop: 20}}>
                    <LinkContainer to="/board">
                        <Breadcrumb.Item>Board</Breadcrumb.Item>
                    </LinkContainer>
                    <LinkContainer to="/board">
                        <Breadcrumb.Item>{params.locationId}</Breadcrumb.Item>
                    </LinkContainer>
                    <LinkContainer to="/board">
                        <Breadcrumb.Item>{params.mapsetId}</Breadcrumb.Item>
                    </LinkContainer>
                    <LinkContainer to="/board">
                        <Breadcrumb.Item>{params.rasterId}</Breadcrumb.Item>
                    </LinkContainer>
                </Breadcrumb>
                <Row md={2}>
                    <Col>
                        <Row>
                            <Card className="bg-dark text-white">
                                <RasterCardImage 
                                    card={false} 
                                    rasterName={params.rasterId}
                                    locationName={params.locationId}
                                    mapsetName={params.mapsetId}
                                ></RasterCardImage>
                                <Card.ImgOverlay>
                                    <Card.Body  style={{ backgroundColor: 'rgba(30, 30, 30, 0.4)' }}>
                                    <Card.Title><h1>{params.rasterId}</h1></Card.Title>
                                    <Card.Text>
                                    {info.title}
                                    </Card.Text>
                                    <Card.Text>Last updated {info.date}</Card.Text>
                                    <LinkContainer to={`/board/location/${params.locationId}/mapset/${params.mapsetId}/raster/${params.rasterId}/map`}>
                                        <Button variant="outline-secondary" size="lg" className="align-self-end">View Map</Button>
                                    </LinkContainer> 
                                    </Card.Body>
                                </Card.ImgOverlay>
                            </Card>
                        </Row>
                        <Row>
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
                        </Row>
                        <Row>
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
                        </Row>
                    
                    </Col>

                    
                    <Col>
                    <Row>
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
                                    <td>{info.mapset}</td>
                                </tr>
                                
                                <tr>
                                    <td>Location</td>
                                    <td>{info.location}</td>
                                </tr>
                                <tr>
                                    <td>Datatype</td>
                                    <td>{info.datatype}</td>
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
                    </Row>
                    <Row>
                    <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Info</th>
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
                        <tr>
                            <td>NS Resolution</td>
                            <td>{info.nsres}</td>
                        </tr>
                        <tr>
                            <td>EW Resolution</td>
                            <td>{info.ewres}</td>
                        </tr>
                    </tbody>
                    </Table>
                    </Row>
                    <Row>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Projection</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>EPSG: {info.epsg}</td>
                            </tr>
                    </tbody>
                    </Table>
                    </Row>
                    <Row>
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
                    </Row>
                    
                    <Row>
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
                            </Row>
                            <Row>
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
                        
                    </Row>
                   
                    
                    </Col>
                    
                </Row>
                
                <Row md={1}>
                    
                    <Col>
                    <Table striped bordered hover responsive size="sm" 
                    
                    className="overflow-hidden"
                    >
                            <thead>
                                <tr>
                                    <th>Comments</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><code style={{overflowY:'hidden'}}>{info.comments}</code></td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                    
                </Row>
              
            </Container>
        
        )
 
  }


export default BoardDetail