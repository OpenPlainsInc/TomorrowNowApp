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


import '../module.scss';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Form from 'react-bootstrap/Form'
import ModuleRasterParam from './ModuleRasterParam';
import ModuleEnumParam from './ModuleEnumParam';


const ModuleStringParam = ({param}) => {

    const [subtype, setSubtype] = useState(null);
    const [subtypeComponent, setSubtypeComponent] = useState(null);
    const [enumOptions, setEnumOptions] = useState(null);
    const [defaultOption, setDefaultOption] = useState(null);
    let count= 0
    console.log('ModuleStringParam', this)


  
    useEffect(() => {
        count++
        console.log("Count", count)
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

        if (param.hasOwnProperty('default')) {
            setDefaultOption(param.default)
        }
    }, [param, subtype, enumOptions, defaultOption ])
  
    useEffect(() => {
      if (!subtype && !enumOptions) return;
      if (enumOptions) return setSubtypeComponent(<ModuleEnumParam param={param} options={enumOptions} defaultValue={defaultOption}/>);
      if (!subtype) return null;
      if (subtype === 'vector') return null;
      if (subtype === 'cell') return setSubtypeComponent(<ModuleRasterParam param={param} />);
      if (subtype === 'coords') return null;
     
    }, [param, subtype, enumOptions])

//   useEffect(() => {
//     if (!enumOptions) return null;
//     console.log("Enums", enumOptions)
//     console.log("Default Option", defaultOption)
//     setSubtypeComponent(<ModuleEnumParam param={param} options={enumOptions} defaultValue={defaultOption}/>)
//     }, [param, enumOptions])
    
  
    return (      
        <Form.Group as={Row} controlId={`moduleString.${param.name}`} className="mb-3">
            <Form.Label column sm={2}>{param.name}</Form.Label>
            <Form.Text muted>{param.description}</Form.Text>
            <Col sm={10}>
                { 
                    subtypeComponent ? 
                        subtypeComponent : 
                        <Form.Control 
                            type="text" 
                            placeholder={param.schema.type} 
                        />
                }
                
            </Col>
        </Form.Group>                  
    )
}


export default ModuleStringParam




