/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/Grass/Utils/GrassDataTypeSelect.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Thursday, April 28th 2022, 5:17:30 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */


import React, { useRef, useState, useEffect } from "react"
import Grass from "../grass"
import Form from 'react-bootstrap/Form'
import InputGroup from "react-bootstrap/InputGroup"

const GrassDataTypeSelect = ({selectionType, onSelect}) => {
  // on component mount
  const [value, setValue] = useState("")
  const [options, setOptions] = useState(['raster', 'vector', 'strds', 'STAC'])


  function handleSeletionEvent(e) {
    let newValue = e.target.value
    setValue(newValue)
    onSelect(e)
  }

  return (
    <InputGroup className="mb-3" style={{marginTop: 20}}>
        <InputGroup.Text id="basic-addon1">Type</InputGroup.Text>
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
    </InputGroup>
  )



}
export default GrassDataTypeSelect;