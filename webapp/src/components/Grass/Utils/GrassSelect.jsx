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
import ButtonGroup from "react-bootstrap/ButtonGroup"
import DropdownButton from "react-bootstrap/DropdownButton"
import Dropdown from "react-bootstrap/Dropdown"
import { GrassFormModal } from "./GrassFormModal"

const GrassSelect = ({selectionType, onSelect, location="nc_spm_08", mapset="PERMANENT"}) => {
  // on component mount
  const [value, setValue] = useState("")
  const [inputLabel, setInputLabel] = useState("")
  const [options, setOptions] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [modalAction, setModalAction] = useState(null)


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

  const openModal = (e, actionType) => {
    e.preventDefault()
    console.log("openModal", e, actionType, inputLabel)
    setShowModal(true)
    setModalAction(actionType)
    
  }

  const selectResource = () => {
    if (modalAction === 'Create' && inputLabel === 'Location') return Grass.createLocation;
    // if (modalAction === 'Delete' && inputLabel === 'Location') return Grass.deleteLocation;
    if (modalAction === 'Create' && inputLabel === 'Mapset') return Grass.createMapset;
    // if (modalAction === 'Delete' && inputLabel === 'Mapset') return Grass.deleteMapset;
  }

  return (
    <>
    <InputGroup className="mb-3" style={{marginTop: 20}}>
        <DropdownButton variant="secondary-light"  title={inputLabel} id="bg-vertical-dropdown-1">
          <Dropdown.Item eventKey="1" onClick={ (e)=> openModal(e, "Create")}>Create {inputLabel}</Dropdown.Item>
          <Dropdown.Item eventKey="2">Delete {inputLabel}</Dropdown.Item>
        </DropdownButton>
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
    <GrassFormModal 
        heading={inputLabel}
        actionType={modalAction}
        show={showModal}
        handleClose={() => setShowModal(false)}
        resource={selectResource}
        sourceLocation={location}
      ></GrassFormModal>
    </>
  )



}
export default GrassSelect;