/*
 * Filename: ProtectedArea.js
 * Project: TomorrowNow
 * File Created: Tuesday October 18th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Sun Nov 13 2022
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
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { useEffect } from 'react';
import { LikertScaleSelect } from '../../../components/Grass/Controls/LikertScaleSelect';
import { useWatch, useFieldArray } from "react-hook-form";
import GeoJSON from 'ol/format/GeoJSON';


export const ProtectedArea = ({devRestrictions}) => {


    const [data, setData] = useState([])
    const currencyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    })
   
    const { fields, append, remove, prepend } = useFieldArray({
        name: "development_potential"
      });

    const devPotentialField = useWatch({name: "development_potential"})
    

    // In the futures these values will be set by the model goal response from the API
    const likertResponses = [
        {value: "-0.99", text: "Highly Decrease Likelihood of Development"},
        {value:"-0.5", text: "Decrease Likelihood of Development"},  
        {value: "0.0", text: "Status Quo"},
        {value: "0.5", text: "Increase Likelihood of Development"},
        {value: "0.99", text: "Highly Increase Likelihood of Development"}
    ]

    const estimateLandCost = (km2) => {
        const AVG_COST_PER_ACRE = 124862.00;
        const km2ToAcreConstant = 247.105;
        const estCostRaw = (km2 * km2ToAcreConstant * AVG_COST_PER_ACRE).toFixed(2)
        const formatedCost = currencyFormatter.format(estCostRaw)
        return {estCostRaw, formatedCost}
    }
    /**
     * Handles events where a new restriction is added to the map.
     */
    useEffect(()=> {

        const addRestriction = (e) => {
            e.preventDefault()
            let tmp = []
            e.target.forEach((f) => {
                let feat = new GeoJSON().writeFeatureObject(f, {
                        dataProjection: 'EPSG:5070', 
                        featureProjection: 'EPSG:4326' 
                        // featureProjection: 'EPSG:3857', 
                        // dataProjection: 'EPSG:4326' 
                      })
                
                let tract = {
                    value: undefined,
                    area: (f.getGeometry().getArea() / 1e6).toFixed(3),
                    landuse: 'Forested'
                }
                feat.properties = tract
                console.log("New Feature:", feat)

                tmp.push(feat)
                console.log("Adding Feature:", feat)
            })
            
            setData(oldArray =>[...tmp])
        }

        devRestrictions.on('add', addRestriction)
        return () => {
            devRestrictions.un('add', addRestriction)
        }
    }, [devRestrictions])

    const removeItem = (e, index) => {
        e.preventDefault()
        console.log("RemoveItem", index, data[index])

        remove(index)
        let copy = [...data]
        copy.splice(index, 1)
        setData(copy)
        devRestrictions.removeAt(index)
        devRestrictions.changed()
    }
    

    // devRestrictions.on('remove', (element, index, target, type) => console.log(element, index, target, type))
    // devRestrictions.on('change', (element, index, target, type) => console.log(element, index, target, type))
    // devRestrictions.on('error', (element, index, target, type) => console.log(element, index, target, type))

    // useEffect(()=> {
    //     console.log("Hello", data)
    // }, [data])

    useEffect(()=> {
        if (!Array.isArray(data) || !Array.isArray(devPotentialField)) return;
        console.log("devPotentialField", devPotentialField, data)
        if (!data.length || devPotentialField.length) return;
        console.log("devPotentialField", devPotentialField)
        let copy = [...data]
        let updatedValues = copy.map((f, idx) => {
            f.properties.value = devPotentialField[idx]
            return f
        })
        setData(updatedValues)
    }, [devPotentialField, data])

    return (
        <Card>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <Card.Title>Development Potential</Card.Title>
            <Card.Body>
                <Card.Text>Set an areas future development potential by drawing polygons on the map and selecting the likelihood the area will be developed in the future.</Card.Text>
                <ListGroup as="ol" numbered>
                    { 
                        data.map((d, idx) => {
                            return (
                                <ListGroup.Item key={idx} as="li"
                                    className="d-flex justify-content-between align-items-start"
                                >
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">{d.properties.landuse}</div>
                                        Est. Cost: {estimateLandCost(d.properties.area).formatedCost}
                                    </div>
                                    <Badge bg="primary" pill>{d.properties.area} km<sup>2</sup></Badge>
                                    <div className="ms-2 me-auto">
                                        <LikertScaleSelect formKey={`development_potential.${idx}`} label={"Development Potential"} responses={likertResponses}/>
                                    </div>
                                    <Row md={12}>
                                        <Button variant="danger" onClick={(e) => {removeItem(e, idx)}}>Remove</Button>
                                    </Row>
                                    
                                </ListGroup.Item>
                            )
                        })
                    }
                </ListGroup>
            </Card.Body>
        </Card>
    )
}