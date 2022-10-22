/*
 * Filename: ModelForm.js
 * Project: TomorrowNow
 * File Created: Friday September 23rd 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Fri Oct 21 2022
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


/*
 * Filename: ModelDetialView.js
 * Project: TomorrowNow
 * File Created: Friday September 23rd 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Fri Sep 23 2022
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

import {useForm, FormProvider, useFormContext} from "react-hook-form";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SelectCountiesMap from './SelectCountiesMap';
import ModelDetailView from '../ModelDetialView';
import { useToken } from '../../../components/Grass/Utils/Auth/useToken';
import { settings } from '../../../components/Grass/Settings';
import { useNavigate } from 'react-router-dom';

const ModelForm = ({children}) => {
    const {token, isTokenValid} = useToken()
    const navigate = useNavigate()
    const ACTINIA_BASE_URL = settings.ACTINIA_BASE_URL;
    let defaultValues = {
        modelName: "", 
        senarios: 0, 
        users: [],
        goals: {
            limit_landscape_fragmentation: false,
            reduce_property_damage_flooding: false,
            protect_water_quality: false,
            reduce_flooding_over_roads: false,
            protect_natural_reasources: false
        },
        counties: [],
        spatialTemporalScale: {
            spatial: {
                res: 30, // meters
                extent: []
            },
            temporal: {
                res: 365, //days - 1 year
                extent: 10 //years
            }
        },
        // status: null
    }

    const methods = useForm({
        defaultValues
      });

    const createModel = (async (formData) => {
        /**
         * Route: /savana/models/
        */
        if (!isTokenValid()) return; 
        try {
            const url = new URL(`${ACTINIA_BASE_URL}/models/`)
            let res = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({...formData}),
                headers: {
                    'Authorization': `Token ${token.token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log(res)
            if (res.ok) {
                let data = await res.json();
                console.log("response:", data)
                return navigate(`/futures/${data.id}`, {replace: true})
            }
                          
          } catch (e) {
            console.log(e);
        }
    })
    
    const onSubmit = data => {
        console.log("Form Data", data)
        let model = createModel(data)
        console.log(model)
        
    }


    return(
        <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(onSubmit)}>
                <Row>
                    <Col md={8}>
                        <SelectCountiesMap/>
                    </Col>
                    <Col md={4}>
                        <ModelDetailView modelDesisEditable={true}></ModelDetailView>
                    </Col>
                </Row>
            </Form>
        </FormProvider>
    )
}

export default ModelForm