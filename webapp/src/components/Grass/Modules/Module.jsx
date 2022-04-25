/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/Grass/Modules/Module.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Tuesday, April 12th 2022, 4:05:44 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */


// react
import React, { useState, useEffect } from 'react';
import {useParams, useLocation } from "react-router-dom";

// import 'ol/ol.css';
import './module.scss';
// import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Grass from '../grass'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import ModuleStringParam from './Inputs/ModuleStringParam'
import ModuleBooleanParam from './Inputs/ModuleBooleanParam';
import ModuleArrayParam from './Inputs/ModuleArrayParam';
import ModuleNumberParam from './Inputs/ModuleNumberParam';

const Module = ({moduleName}) => {
  let params = useParams();
  const [module, setModule] = useState([]);
  const [moduleParams, setModuleParams] = useState([])
  const [subsections, setSubsections] = useState(['required', 'optional', 'output', 'manual']);
  const [activeSubsection, setActiveSubsection] = useState('required');
  const [sectionParams, setSectionParams] = useState([]);



  if (!moduleName) {
    moduleName = params.moduleName
  }

  const filterSectionParams = (params, section) => {
    let filterdParams = params.filter(f => {
      if (section == 'optional' && f.optional){
        return f
      }
      else if (section == 'required' && !f.optional) {
        return f
      }
      else {
        return false
      }
    })
    return filterdParams
  }

  const manualUrl = (moduleName) => {
    let coreUrl = `https://grass.osgeo.org/grass80/manuals/${moduleName}.html`
    let addonUrl = `https://grass.osgeo.org/grass80/manuals/addons/${moduleName}.html`
    return coreUrl
  }
  const handleSelect = (eventKey) => {
    console.log("Select Event", eventKey)
    
    console.log(`https://grass.osgeo.org/grass80/manuals/addons/${moduleName}.html`)

    setActiveSubsection(eventKey)
  }

  const formInputFromSchema = (param, idx) => {
    let schemaType = param.schema.type
    if (schemaType === 'string') return <ModuleStringParam key={idx} param={param}></ModuleStringParam>;
    if (schemaType === 'boolean') return <ModuleBooleanParam key={idx} param={param}></ModuleBooleanParam>;
    if (schemaType === 'array') return <ModuleArrayParam key={idx} param={param}></ModuleArrayParam>;
    if (schemaType === 'number') return <ModuleNumberParam key={idx} param={param}></ModuleNumberParam>
  }

  useEffect(() => {
    let isMounted = true;   
    (async () => {
      let res = await Grass.g.modules.get(moduleName)
      let data = res.response
      console.log(data)
      setModule(data)
      let params = data.parameters
      console.log(params)
      setModuleParams(params)
      setSectionParams(filterSectionParams(params, activeSubsection))

      return () => { isMounted = false }   
    })()    
  }, [])



  useEffect(() => {
    if (!moduleParams || !activeSubsection) return;
    setSectionParams(filterSectionParams(moduleParams, activeSubsection))
  }, [moduleParams, activeSubsection])
  
        return (
          <Container fluid className="bg-light text-dark">
              <Row style={{ marginBottom: "2rem" }}>
                <Card>
                  <Card.Body>
                    <Card.Title>
                      {moduleName}
                    </Card.Title>
                    <Card.Text>
                      {module.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              
                <Card >
                    <Card.Header>
                        <Nav variant="tabs" activeKey={activeSubsection} onSelect={handleSelect}>
                        {
                            subsections.map((section, idx) => {
                                return(
                                    <Nav.Item key={idx}>
                                        <Nav.Link eventKey={section}>{section}</Nav.Link>
                                    </Nav.Item>
                                )
                            })
                        }
                        </Nav>
                    </Card.Header>
                   
                </Card>
              </Row>

              <Row>
              <Form ref={module.name}>
              { 
                sectionParams.map((p, idx) => { 
                  return(       
                    <Col key={idx} md={6}>
                      
                        {formInputFromSchema(p, idx)}

                      
                    </Col>     
                  )
                })
              }
              </Form>
              </Row>
              {
              activeSubsection === 'manual' ?
                <Row>
                  <iframe className="grass-manual" src={manualUrl(moduleName)} title={`Manual Page: ${moduleName}`}></iframe>
                </Row> :
                <Row></Row>
              }
          </Container>
        )
  }


export default Module

