/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/Grass/Utils/GrassSelect.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Wednesday, April 20th 2022, 2:56:25 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */


import React, { useRef, useState, useEffect } from "react"
import Grass from "../grass"
import Form from 'react-bootstrap/Form'
import InputGroup from "react-bootstrap/InputGroup"

const GrassSelect = ({selectionType, onSelect, location="nc_spm_08", mapset="PERMANENT"}) => {
  // on component mount
  const [value, setValue] = useState("")
  const [inputLabel, setInputLabel] = useState("")
  const [options, setOptions] = useState([])

  useEffect(() => {
    let isMounted = true;
    (async () => {
      if (selectionType == "locations") {
        setValue(location)
        setInputLabel("Location")
        let data =  await Grass.getLocations()
        console.log("locations", data.response)
        setOptions(data.response.locations)
      }
      else if (selectionType == "mapsets") {
        setValue(mapset)
        setInputLabel("Mapset")
        let data =  await Grass.locations.location.mapsets.getMapsets(location)
        console.log("mapsets", data.response)
        setOptions(data.response.process_results)
      }
      else {
          return null
      }
      return () => { isMounted = false }
    })()
  },[location]);

  function handleSeletionEvent(e) {
    let newValue = e.target.value
    setValue(newValue)
    onSelect(e)
  }

  return (
    <InputGroup className="mb-3" style={{marginTop: 20}}>
        <InputGroup.Text id="basic-addon1">{inputLabel}</InputGroup.Text>
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
export default GrassSelect;