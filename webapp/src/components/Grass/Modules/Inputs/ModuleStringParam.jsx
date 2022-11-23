/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/Grass/Modules/Inputs/ModuleStringParam.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Friday, April 22nd 2022, 4:07:07 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */


/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/Grass/Modules/Module.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Tuesday, April 12th 2022, 4:05:44 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */


// react
import React, { useState, useEffect, useId } from 'react';
import { useController } from "react-hook-form";

import '../module.scss';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Form from 'react-bootstrap/Form'
import ModuleRasterParam from './ModuleRasterParam';
import ModuleEnumParam from './ModuleEnumParam';
import { appendErrors } from 'react-hook-form';
import ModuleVectorParam from './ModuleVectorParam';


const ModuleStringParam = ({param, control}) => {
    console.log("ModuleStringParam", param.name)
    const [subtype, setSubtype] = useState(null);
    const [subtypeComponent, setSubtypeComponent] = useState(null);
    const [enumOptions, setEnumOptions] = useState(null);
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


  
    useEffect(() => {
        
        if (!param) return;
        if (param.schema.type !== 'string') {
            return console.error(`GRASS module parameter ${param.name} is not a string`, param)
        }
        if (param.schema.hasOwnProperty('subtype')) {
            setSubtype(param.schema.subtype)
        }

        if (param.schema.hasOwnProperty('enum')) {
            setEnumOptions(param.schema.enum)
        }

        if (param.schema.hasOwnProperty('options')) {
            setEnumOptions(param.schema.options)
        }

        
    }, [param])
  
    useEffect(() => {
      if (!control) return;
    //   if (!subtype && !enumOptions) return;
    //   if (enumOptions) return setSubtypeComponent(<ModuleEnumParam param={param} options={enumOptions} control={control}/>);
      if (!subtype || param.output) return;
      if (subtype === 'vector') return setSubtypeComponent(<ModuleVectorParam param={param}  control={control}/>);
      if (subtype === 'cell') return setSubtypeComponent(<ModuleRasterParam param={param}  control={control}/>);
      if (subtype === 'coords') return;
      if (subtype === 'grid3') return; // Need to implement strds routes
      if (subtype === 'file') return; // Need to implement strds routes
    }, [subtype])

    useEffect(() => {
        if (!control) return;
        if (!enumOptions) return;
        if (enumOptions) return setSubtypeComponent(<ModuleEnumParam param={param} options={enumOptions} control={control}/>);
      }, [enumOptions])
    
  
    return (      
        <Form.Group as={Row} controlId={`moduleString.${param.name}`} className="mb-3">
            <Form.Label column sm={2}>{param.name}</Form.Label>
            <Form.Text muted>{param.description}</Form.Text>
            <Col sm={10}>
                { 
                    (subtype || enumOptions) && !param.output ? 
                        subtypeComponent : 
                        <Form.Control 
                            type="text" 
                            name={name}
                            onChange={onChange}
                            value={value}
                            ref={ref}
                            // isInvalid={appendErrors[param.name]}
                            placeholder={param.schema.type} 
                        />
                }
                
            </Col>
        </Form.Group>                  
    )
}


export default ModuleStringParam




