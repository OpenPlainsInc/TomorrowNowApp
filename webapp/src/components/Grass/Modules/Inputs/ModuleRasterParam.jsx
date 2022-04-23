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


import '../module.scss';
import InputGroup from 'react-bootstrap/InputGroup'
// import FloatingLabel from 'react-bootstrap/FloatingLabel'

import Form from 'react-bootstrap/Form'
import Grass from '../../grass'
import { useParams } from 'react-router-dom';

const ModuleRasterParam = ({param}) => {
  const [subtype, setSubtype] = useState(null);
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);

  const handleSeletionEvent = (e) => {
    let newValue = e.target.value
    setValue(newValue)
  }



  useEffect(() => {
      if (param.schema.subtype !== 'cell') {
          console.warn(`GRASS module parameter ${param.name} is not of type cell`, param)
          return null;
      }
      if (param.schema.hasOwnProperty('subtype')) {
          setSubtype(param.schema.subtype)
      }
    }, [param])


    useEffect(() => {
        if (subtype !== 'cell') return;
        let isMounted = true;   
        (async ()=> {
            let data = await Grass.locations.location.mapsets.getRasterLayers('nc_spm_08', 'PERMANENT')
            console.log("Raster Layers", data)
           
            let rasterData = data.response.process_results
            console.log("rasterData", rasterData)
            setOptions(rasterData)
            
        })()
        return () => { isMounted = false } 
    }, [subtype])
  
    return (      
        // <InputGroup className="mb-3">
        //     <InputGroup.Text id={`RasterSelect.${param.name}`}>{param.name}</InputGroup.Text>
            <Form.Control as="select" value={value} onChange={handleSeletionEvent}>
                <option>Select Raster</option>

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


export default ModuleRasterParam





