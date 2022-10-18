/*
 * Filename: ProtectedArea.js
 * Project: TomorrowNow
 * File Created: Tuesday October 18th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Tue Oct 18 2022
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
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import { useEffect } from 'react';


export const ProtectedArea = ({devRestrictions}) => {

    const [data, setData] = useState([])
    
    /**
     * Handles events where a new restriction is added to the map.
     */
    useEffect(()=> {

        const addRestriction = (e) => {
            e.preventDefault()
            let tmp = []
            e.target.forEach((f) => {
                let tract = {
                    // id: f.getId(),
                    area: (f.getGeometry().getArea() / 1e6).toFixed(3),
                    landuse: 'Forested'
                }
                tmp.push(tract)
            })
            console.log(tmp)
            setData(oldArray =>[...tmp])
        }

        devRestrictions.on('add', addRestriction)
        return () => {
            devRestrictions.un('add', addRestriction)
        }
    }, [devRestrictions])
    

    // devRestrictions.on('remove', (element, index, target, type) => console.log(element, index, target, type))
    // devRestrictions.on('change', (element, index, target, type) => console.log(element, index, target, type))
    // devRestrictions.on('error', (element, index, target, type) => console.log(element, index, target, type))

    useEffect(()=> {
        console.log("Hello", data)
    }, [data])


    return (
        <Card style={{ width: '18rem' }}>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <Card.Body>
                <Card.Title>Development Restrictions</Card.Title>
                <ListGroup as="ol" numbered>
                    { 
                        data.map((d, idx) => {
                            return (
                                <ListGroup.Item key={idx} as="li"
                                    className="d-flex justify-content-between align-items-start"
                                >
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">{d.landuse}</div>
                                        Something here
                                    </div>
                                    <Badge bg="primary" pill>{d.area} km<sup>2</sup></Badge>
                                </ListGroup.Item>
                            )
                        })
                    }
                </ListGroup>
            </Card.Body>
        </Card>
    )
}