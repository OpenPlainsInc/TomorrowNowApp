/*
 * Filename: ComputationalRegion.js
 * Project: TomorrowNow
 * File Created: Thursday October 20th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Thu Oct 20 2022
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
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table';


const ResolutionCardTable = ({region}) => {

    return (
        <Card>
            <Card.Header>
                <Card.Title>Resolution</Card.Title>
            </Card.Header>
            <Card.Body>
                <Table striped="columns" bordered hover>
                    <thead>
                        <tr>
                            <th></th>
                            <th>2D</th>
                            <th>3D</th>
                        
                        </tr>
                    </thead>
                        <tbody>
                            <tr>
                                <td>NS Resolution</td>
                                <td>{region.nsres}</td>
                                <td>{region.nsres3}</td>
                            </tr>
                            <tr>
                                <td>EW Resolution</td>
                                <td>{region.ewres}</td>
                                <td>{region.ewres3}</td>
                            </tr>
                            <tr>
                                <td>tbres</td>
                                <td>{region.tbres}</td>
                                <td></td>
                            </tr>
                        </tbody>
                </Table>
            </Card.Body>
            {/* <Card.Footer>
                <Card.Title>Resolution</Card.Title>
            </Card.Footer> */}
        </Card>
    )
}

const BoundsCardTable = ({region}) => {
    
    return (
        <Card>
            <Card.Header>
                <Card.Title>Bounds</Card.Title>
            </Card.Header>
            <Card.Body>
                <Table striped="columns" bordered hover>
                    <thead>
                        <tr>
                            <th>Extent</th>
                            <th></th>
                        </tr>
                    </thead>
                        <tbody>
                            <tr>
                                <td>{`N = ${region.n}`}</td>
                                <td>{`S = ${region.s}`}</td>
                            </tr>
                            <tr>
                                <td>{`E = ${region.e}`}</td>
                                <td>{`W = ${region.w}`}</td>
                            </tr>
                        </tbody>
                </Table>
            </Card.Body>
            
        </Card>
    )
}


export const ComputationalRegion = ({region}) => {

    return (
        <Row>
            <Col>
                <ResolutionCardTable region={region}/>
            </Col>
            <Col>
                <BoundsCardTable region={region}></BoundsCardTable>
            </Col>
        </Row>
    )
}
