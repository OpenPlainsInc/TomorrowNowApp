/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/Grass/Utils/GrassFormModal.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Tuesday, May 17th 2022, 4:20:43 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */

import React, {useState} from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import {useForm, Controller} from "react-hook-form";

                                                                      


export const GrassFormModal = ({heading, actionType, show=false, handleClose, resource, sourceLocation}) => {
    const { handleSubmit, control, reset } = useForm();

    const onSubmit = data => {
        console.log("Form Data:", data);
        (async () => {
          if (heading === "Location" && actionType === "Create") {
            let response = await resource(data.location_name, data.epsg_code)
            console.log("onSubmit: response", response)
          }
          if (heading === "Mapset" && actionType === "Create") {
            let response = await resource()(sourceLocation, data.mapset_name)
            console.log("onSubmit create mapset: response", response)
          }

          handleClose()
        })()
        
    }

    return (
        <>
        <Modal show={show} onHide={handleClose} backdrop="static"  keyboard={false}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title>{`${actionType} ${heading}`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          { 
          (heading === 'Location' && actionType === 'Create') ?
            <>
            <Form.Group className="mb-3" controlId="LocationName">
              <Form.Label>Location Name</Form.Label>
              <Controller 
                control={control}
                name={"location_name"}
                defaultValue="" 
                render={({ field: { onChange, onBlur, value, ref } }) => (  
                  <Form.Control
                  ref={ref}
                  type="text"
                  placeholder="Location name"
                  value={value}
                  onChange={onChange}
                  autoFocus
                />)}
              />
            </Form.Group>


            <Form.Group className="mb-3" controlId="EPSG">
              <Form.Label>EPSG</Form.Label>
              <Controller 
                control={control}
                name={"epsg_code"}
                defaultValue="" 
                render={({ field: { onChange, onBlur, value, ref } }) => (  
                  <Form.Control
                  ref={ref}
                  type="text"
                  placeholder="ex. 1234"
                  value={value}
                  onChange={onChange}
                  autoFocus
                />)}
              />
            </Form.Group>
            </>
            :

           (heading === 'Mapset' && actionType === 'Create') ? 
            <>
           <Form.Group className="mb-3" controlId="EPSG">
              <Form.Label>Location Name</Form.Label>
              <Form.Control
                  type="text"
                  placeholder={sourceLocation}
                  disabled
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="EPSG">
              <Form.Label>Mapset Name</Form.Label>
              <Controller 
                control={control}
                name={"mapset_name"}
                defaultValue="" 
                render={({ field: { onChange, onBlur, value, ref } }) => (  
                  <Form.Control
                  ref={ref}
                  type="text"
                  placeholder="name"
                  value={value}
                  onChange={onChange}
                  autoFocus
                />)}
              />
            </Form.Group>
            </>

            :
            <></>
          }
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Create
            </Button>
          </Modal.Footer>
          </Form>
        </Modal>
      </>
    )
}