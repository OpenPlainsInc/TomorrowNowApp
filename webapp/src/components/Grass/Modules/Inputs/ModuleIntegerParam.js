/*
 * Filename: ModuleIntegerParam.js
 * Project: TomorrowNow
 * File Created: Tuesday November 22nd 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Tue Nov 22 2022
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


import React, { useState, useEffect } from 'react';
import { useController } from "react-hook-form"


import '../module.scss';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Form from 'react-bootstrap/Form'

const ModuleIntegerParam = ({param, control}) => {

    const [subtype, setSubtype] = useState(null);
    const [defaultOption, setDefaultOption] = useState(null);
    const [subtypeComponent, setSubtypeComponent] = useState(null)
    console.log('ModuleNumberParam')
    const {
        field: { onChange, onBlur, name, value, ref },
        fieldState: { invalid, isTouched, isDirty },
        formState: { touchedFields, dirtyFields }
    } = useController({
        name: param.name,
        control,
        rules: { required: !param.optional },
        defaultValue: param.default || 0,
    });

  
    useEffect(() => {
        if (!param) return;
        if (param.schema.type !== 'integer') {
            return console.error(`GRASS module parameter ${param.name} is not an integer`, param)
        }
        if (param.schema.hasOwnProperty('subtype')) {
            setSubtype(param.schema.subtype)
        }

    }, [param, subtype ])
  

    useEffect(() => {
        if (!subtype) return;
        if (subtype === 'cat') return null;
      }, [param, subtype])
    
  
    return (      
        <Form.Group as={Row} controlId={`moduleInteger.${param.name}`} className="mb-3">
            
            <Form.Label column sm={4}>{param.name}</Form.Label>
            <Form.Text muted>{param.description}</Form.Text>
            <Col sm={10}>
                {
                    subtype ? subtypeComponent :
                    <Form.Control 
                        type="number"
                        step="1"
                        value={value} 
                        name={name}
                        onChange={onChange}
                        placeholder={param.schema.type} 
                    />
                }
            </Col>
        </Form.Group>                  
    )
}


export default ModuleIntegerParam