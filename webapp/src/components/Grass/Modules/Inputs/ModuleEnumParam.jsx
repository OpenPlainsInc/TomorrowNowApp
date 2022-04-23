/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/Grass/Modules/Inputs/ModuleEnumParam.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Friday, April 22nd 2022, 7:09:18 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */


// react
import React, { useState, useEffect } from 'react';


import '../module.scss';
import InputGroup from 'react-bootstrap/InputGroup'
// import FloatingLabel from 'react-bootstrap/FloatingLabel'

import Form from 'react-bootstrap/Form'
import { useParams } from 'react-router-dom';

const ModuleEnumParam = ({param, options, defaultValue}) => {
  const [value, setValue] = useState(defaultValue);

  const handleSeletionEvent = (e) => {
    let newValue = e.target.value
    setValue(newValue)
  }

    // useEffect(() => {
    //     setValue(defaultValue);
    // }, [value])

  
  
    return (      
        // <InputGroup className="mb-3">
        //     <InputGroup.Text id={`EnumSelect.${param.name}`}>{param.name}</InputGroup.Text>
            <Form.Control as="select" value={value} onChange={handleSeletionEvent}>
                {options ? options.map((c, idx) => {
                    return(
                    <option key={idx} value={c}>
                        {c}
                    </option>
                    )
                }) : []
            }
            </Form.Control>
        // </InputGroup>
    )
}


export default ModuleEnumParam





