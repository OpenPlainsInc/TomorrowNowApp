/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/Grass/Modules/Inputs/ModuleRasterParam.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Tuesday, April 12th 2022, 4:05:44 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */


// react
import React, { useState, useEffect } from 'react';
import { useController } from "react-hook-form"
import '../module.scss';
import Form from 'react-bootstrap/Form'
import grass from "@openplains/grass-js-client";
import { useDataSource } from '../../Utils/useDataSource';
const ModuleRasterParam = ({param, control}) => {
    const [subtype, setSubtype] = useState(null);
    console.log("ModuleRasterParam", param.name)
    
    //TODO: set location/mapset dynamically
    const options = useDataSource({getDataFunc: grass.routes.Layers.getRasters, params: ['nc_spm_08', 'PERMANENT']})

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
      if (param.schema.subtype !== 'cell') {
          console.warn(`GRASS module parameter ${param.name} is not of type cell`, param)
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
                <option>Select Raster</option>

                {options.data ? options.data.processResults.map((c) => {
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


export default ModuleRasterParam





