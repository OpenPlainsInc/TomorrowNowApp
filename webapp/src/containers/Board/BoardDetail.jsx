import React, { useState, useEffect, useRef, Fragment} from "react"
import {useParams, useLocation } from "react-router-dom";

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Breadcrumb from "react-bootstrap/Breadcrumb"
import Spinner from "react-bootstrap/Spinner"
import Table from "react-bootstrap/Table"
import Image from "react-bootstrap/Image"
import {LinkContainer} from 'react-router-bootstrap'
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"


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
                <Image as="img" fluid={true} src={image ? image.imgurl : ""} className="bg-dark text-light"></Image>
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
                        <Breadcrumb.Item>{info.location}</Breadcrumb.Item>
                    </LinkContainer>
                    <LinkContainer to="/board">
                        <Breadcrumb.Item>{info.mapset}</Breadcrumb.Item>
                    </LinkContainer>
                    <LinkContainer to="/board">
                        <Breadcrumb.Item>{info.map}</Breadcrumb.Item>
                    </LinkContainer>
                </Breadcrumb>
                {/* <Row><h1>{info.map}</h1></Row> */}
                <Row md={2}>
                    <Col>
                        <Row>
                            <Card className="bg-dark text-white">
                                {/* <Card.Img src="holder.js/100px270" alt="Card image" /> */}
                                <RasterImage raster={params.rasterId} />

                                <Card.ImgOverlay>
                                    <Card.Body  style={{ backgroundColor: 'rgba(30, 30, 30, 0.4)' }}>
                                    <Card.Title><h1>{info.map}</h1></Card.Title>
                                    <Card.Text>
                                    {info.title}
                                    </Card.Text>
                                    <Card.Text>Last updated {info.date}</Card.Text>
                                    <LinkContainer to={`/board/map/${params.rasterId}`}>
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