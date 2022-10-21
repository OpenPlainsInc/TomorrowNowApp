/*
 * Filename: ModelDetialView.js
 * Project: TomorrowNow
 * File Created: Friday September 23rd 2022
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

import React, { useEffect, useState, useRef } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import FormControl from "react-bootstrap/FormControl"
import InputGroup from "react-bootstrap/InputGroup"
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

import {useForm, Controller, useFormContext} from "react-hook-form";
// import { useController } from "react-hook-form"
import Form from 'react-bootstrap/Form'
const ModelDetailView = ({modelId=null, selectedCounties=[], modelDesisEditable=false}) => {
    let methods = useFormContext()
    // let defaultValues = {
    //     modelName: "", 
    //     senarios: 0, 
    //     users: [],
    //     goals: {
    //         fragment: false,
    //         natural: false,
    //         floodRoad: false,
    //         floodDamage: false
    //     },
    //     counites: selectedCounties,
    //     spatialTemporalScale: {
    //         spatial: {
    //             res: 30, // meters
    //             extent: []
    //         },
    //         temporal: {
    //             res: 365, //days - 1 year
    //             extent: 10 //years
    //         }
    //     },
    //     status: null
    // }

    // const { control, handleSubmit } = useForm({
    //     defaultValues
    //   });
    
    // const onSubmit = data => console.log(data);


    return(
        // <Form onSubmit={handleSubmit(onSubmit)}>
        <Card>
            <Card.Header as="h2">Model Details</Card.Header>
            <Card.Body>
                
                    <Form.Group className="mb-3" controlId="modelForm.modelName">
                        <Form.Label>Model Name</Form.Label>
                        <Controller 
                            control={methods.control}
                            name={"modelName"}
                            defaultValue="" 
                            render={({ field: { onChange, onBlur, value, ref } }) => (  
                            <Form.Control
                                ref={ref}
                                type="text"
                                placeholder="Model Name"
                                value={value}
                                onChange={onChange}
                                autoFocus
                            />)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="modelForm.modelDescription">
                        <Form.Label>Model Description</Form.Label>
                        <Controller 
                            control={methods.control}
                            name={"modelDescription"}
                            defaultValue="" 
                            render={({ field: { onChange, onBlur, value, ref } }) => (  
                            <Form.Control
                                ref={ref}
                                type="textarea"
                                rows={3}
                                placeholder="Model Description"
                                value={value}
                                onChange={onChange}
                                autoFocus
                            />)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="modelForm.goals">
                        <Form.Label>Goals</Form.Label>
                        <Controller 
                            control={methods.control}
                            name={"goals.protect_natural_reasources"}
                            defaultValue="" 
                            render={({ field: { onChange, onBlur, value, ref } }) => (  
                                <Form.Check
                                    ref={ref}
                                    type="switch"
                                    name="goalsGroup"
                                    label="Protect Natural Reasources"
                                    value="natural"
                                    onChange={onChange}
                                    // multiple={false}
                                    autoFocus/>
                                )}
                            />
                       
                            <Controller 
                                control={methods.control}
                                name={"goals.limit_landscape_fragmentation"}
                                defaultValue="" 
                                render={({ field: { onChange, onBlur, value, ref } }) => (  
                                    <Form.Check
                                    ref={ref}
                                    type="switch"
                                    name="goalsGroup"
                                    label="Limit Landscape Fragmentation"
                                    onChange={onChange}
                                    autoFocus/>
                                )}
                            />

                            <Controller 
                                control={methods.control}
                                name={"goals.protect_water_quality"}
                                defaultValue="" 
                                render={({ field: { onChange, onBlur, value, ref } }) => (  
                                    <Form.Check
                                    ref={ref}
                                    type="switch"
                                    name="goalsGroup"
                                    label="Protect Water Quality"
                                    onChange={onChange}
                                    autoFocus/>
                                )}
                            />

                            <Controller 
                                control={methods.control}
                                name={"goals.reduce_flooding_over_roads"}
                                defaultValue="" 
                                render={({ field: { onChange, onBlur, value, ref } }) => (  
                                    <Form.Check
                                    ref={ref}
                                    type="switch"
                                    name="goalsGroup"
                                    label="Reduce Flooding Over Roads"
                                    onChange={onChange}
                                    autoFocus/>
                                )}
                            />

                            <Controller 
                                control={methods.control}
                                name={"goals.reduce_property_damage_flooding"}
                                defaultValue="" 
                                render={({ field: { onChange, onBlur, value, ref } }) => (  
                                    <Form.Check
                                    ref={ref}
                                    type="switch"
                                    name="goalsGroup"
                                    label="Reduce Property Damage from Flooding"
                                    onChange={onChange}
                                    autoFocus/>
                                )}
                            />
                    </Form.Group>
            </Card.Body>
            <Card.Footer>
                <div className="d-grid gap-2" >
                    <Button variant="secondary" type="submit">Submit</Button>
                </div>
            </Card.Footer>
        </Card>
    // </Form>
   
    )
}

export default ModelDetailView