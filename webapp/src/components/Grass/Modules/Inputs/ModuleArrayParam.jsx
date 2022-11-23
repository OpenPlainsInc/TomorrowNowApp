/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/Grass/Modules/Inputs/ModuleArrayParam.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Friday, April 22nd 2022, 4:46:52 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */


// react
import React, { useState, useEffect } from 'react';


import '../module.scss';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Form from 'react-bootstrap/Form'
import ModuleRasterParam from './ModuleRasterParam';
import { useController } from "react-hook-form";
import ModuleVectorParam from './ModuleVectorParam';

const ModuleArrayParam = ({param, control}) => {
  const [subtype, setSubtype] = useState(null);
  const [subtypeComponent, setSubtypeComponent] = useState(null);
  const {
    field: { onChange, onBlur, name, value, ref },
    fieldState: { invalid, isTouched, isDirty },
    formState: { touchedFields, dirtyFields }
  } = useController({
    name: param.name,
    control,
    rules: { required: !param.optional },
    defaultValue: param.default || "" // TODO: Make array the default value for multi cells
  });
  useEffect(() => {
      if (param.schema.type !== 'array') {
          return console.error(`GRASS module parameter ${param.name} is not an array`, param)
      }
      if (param.schema.hasOwnProperty('subtype')) {
          setSubtype(param.schema.subtype)
      }
  }, [param])

  useEffect(() => {
    if (!subtype) return;
    if (subtype === 'vector') return setSubtypeComponent(<ModuleVectorParam param={param} control={control} />);
    if (subtype === 'cell') return setSubtypeComponent(<ModuleRasterParam param={param} control={control} />);
    if (subtype === 'coords') return null;
}, [subtype, control, param])
  
    return (      
        <Form.Group as={Row} className="mb-3" controlId={param.name}>
            <Form.Label column sm={2}>{param.name}</Form.Label>
            <Form.Text id={param.name} muted>{param.description}</Form.Text>
            <Col sm={10}>
              {subtypeComponent ? subtypeComponent : <Form.Control type="text" placeholder={param.default} />}
            </Col>
        </Form.Group>             
    )
}


export default ModuleArrayParam





