/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/Grass/Modules/Inputs/ModuleVectorParam.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Friday, April 22nd 2022, 5:27:43 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */


import React, { useState, useEffect } from 'react';
import { useController } from "react-hook-form"
import '../module.scss';
import Form from 'react-bootstrap/Form'
import grass from "@openplains/grass-js-client";
import { useDataSource } from '../../Utils/useDataSource';
const ModuleVectorParam = ({param, control}) => {
    const [subtype, setSubtype] = useState(null);
    console.log("ModuleVectorParam", param.name)
    
    //TODO: set location/mapset dynamically
    const options = useDataSource({getDataFunc: grass.routes.Layers.vectors, params: ['nc_spm_08', 'PERMANENT']})
    console.log(options)
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
      if (param.schema.subtype !== 'vector') {
          console.warn(`GRASS module parameter ${param.name} is not of type vector`, param)
          return null;
      }
      if (param.schema.hasOwnProperty('subtype')) {
          setSubtype(param.schema.subtype)
      }
    }, [param])
  
    return (      
       
            <Form.Control 
                name={name} 
                as="select" 
                value={value} 
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}
            >
                <option>Select Vector</option>

                {options.data ? options.data.process_results.map((c) => {
                    return(
                    <option key={c} value={c}>
                        {c}
                    </option>
                    )
                }) : null
            }
            </Form.Control>
    )
}


export default ModuleVectorParam