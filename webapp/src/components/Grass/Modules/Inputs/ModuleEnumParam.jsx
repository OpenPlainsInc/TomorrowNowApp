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
import { useController } from "react-hook-form"

import '../module.scss';
import InputGroup from 'react-bootstrap/InputGroup'
// import FloatingLabel from 'react-bootstrap/FloatingLabel'

import Form from 'react-bootstrap/Form'
import { useParams } from 'react-router-dom';

const ModuleEnumParam = ({param, options, control}) => {
//   const [value, setValue] = useState(defaultValue);

  const {
    field: { onChange, onBlur, name, value, ref },
    fieldState: { invalid, isTouched, isDirty },
    formState: { touchedFields, dirtyFields }
  } = useController({
    name: param.name,
    control,
    rules: { required: !param.optional },
    defaultValue: param.default || "",
  });
  
    return (      
       
            <Form.Control name={name} as="select" value={value} onChange={onChange} ref={ref}>
                {options ? options.map((c, idx) => {
                    return(
                    <option key={idx} value={c}>
                        {c}
                    </option>
                    )
                }) : []
            }
            </Form.Control>
      
    )
}


export default ModuleEnumParam





