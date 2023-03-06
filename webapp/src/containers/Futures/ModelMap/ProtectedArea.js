/*
 * Filename: ProtectedArea.js
 * Project: TomorrowNow
 * File Created: Tuesday October 18th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Mon Feb 13 2023
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
import { useEffect, useCallback} from 'react';
import { LikertScaleSelect } from '../../../components/Grass/Controls/LikertScaleSelect';
import { useWatch, useFieldArray } from "react-hook-form";
import GeoJSON from 'ol/format/GeoJSON';
import { BudgetChart } from './BudgetChart';


export const ProtectedArea = ({devRestrictions}) => {
    const [currencyFormatter, setCurrencyFormatter] = useState(new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }))
    const startingBudgetData = [
        { name: 'Spent', value: 0, formated: "Spent: $0" },
        { name: 'Available', value: 1e8 / 2.0, formated: "Available: $500,000,000" },
    ]
    const [budgetData, setBudgetData] = useState(startingBudgetData)

    const [data, setData] = useState([])
    // const currencyFormatter = useCallback(() => { 
    //     return new Intl.NumberFormat('en-US', {
    //         style: 'currency',
    //         currency: 'USD'
    //     })
    // }, [])
   
    const { fields, append, remove, prepend } = useFieldArray({
        name: "development_potential"
      });

    const devPotentialField = useWatch({name: "development_potential"})
    

    // In the futures these values will be set by the model goal response from the API
    const likertResponses = [
        {value: "-0.99", text: "Greatly reduce likelihood of Development"},
        {value:"-0.5", text: "Reduce likelihood of development"},  
        {value: "0.0", text: "Status quo"},
        {value: "0.5", text: "Increase likelihood of development"},
        {value: "0.99", text: "Greatly increase likelihood of development"}
    ]

    const estimateLandCost = useCallback((km2) => {
        const AVG_COST_PER_ACRE = 124862.00;
        const km2ToAcreConstant = 247.105;
        const estCostRaw = (km2 * km2ToAcreConstant * AVG_COST_PER_ACRE).toFixed(2)
        const formatedCost = currencyFormatter.format(estCostRaw)
        return {estCostRaw, formatedCost}
    }, [currencyFormatter])

    const calculateBudget = useCallback((tmp) => {
        let totalAreaKm = tmp.reduce((a, b) => {
            console.log(a, b)
            if (Number(a) === a && a % 1 !== 0) {
                return parseFloat(a) + parseFloat(b.properties.area)
            }
            return parseFloat(a.properties.area) + parseFloat(b.properties.area)
        }, {"properties": {"area": 0.0}})
        console.log("New Area:", totalAreaKm)
        let {estCostRaw, formatedCost} =  estimateLandCost(totalAreaKm)
        console.log("New Budge:", estCostRaw, formatedCost)
        let newBudget = [
            { name: 'Spent', value: parseInt(estCostRaw), formated: formatedCost },
            { name: 'Available', value: parseInt(1e8 - parseFloat(estCostRaw)), formated: currencyFormatter.format(1e8 - parseFloat(estCostRaw)) }
        ]
        console.log("New Budge:", newBudget)
        setBudgetData(oldeArray => [...newBudget])
    }, [estimateLandCost, currencyFormatter])

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
            console.log(tmp)
            calculateBudget(tmp)
            
            setData(oldArray =>[...tmp])
        }

        devRestrictions.on('add', addRestriction)
        return () => {
            devRestrictions.un('add', addRestriction)
        }
    }, [devRestrictions, calculateBudget])

    const removeItem = (e, index) => {
        e.preventDefault()
        console.log("RemoveItem", index, data[index])

        remove(index)
        let copy = [...data]
        copy.splice(index, 1)
        calculateBudget(copy)
        setData(copy)
        devRestrictions.removeAt(index)
        devRestrictions.changed()
    }
    

    // devRestrictions.on('remove', (element, index, target, type) => console.log(element, index, target, type))
    // devRestrictions.on('change', (element, index, target, type) => console.log(element, index, target, type))
    // devRestrictions.on('error', (element, index, target, type) => console.log(element, index, target, type))

    useEffect(()=> {
        if (!Array.isArray(data) || !Array.isArray(devPotentialField)) return;
        if (!data.length || !devPotentialField.length) return;
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
            <Card.Header>
                <Card.Title>Development Potential</Card.Title>
                {/* <Card.Text>Set an areas future development potential by drawing polygons on the map and selecting the likelihood the area will be developed in the future.</Card.Text> */}
               
            </Card.Header>
           
            <Card.Body>
                <Card.Text>Design an urban land use policy that will influence the future development potential of a designated area. Get started by drawing polygons on the map and selecting the likelihood the area will be developed in the future.</Card.Text>
                <Card.Subtitle>Budget (500 million)</Card.Subtitle>
                <BudgetChart data={budgetData}/>
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
                                        <Button variant="danger" onClick={(e) => {removeItem(e, idx)}}>X</Button>
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