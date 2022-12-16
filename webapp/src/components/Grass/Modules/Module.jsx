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
import './module.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import grass from "@openplains/grass-js-client";
import Nav from 'react-bootstrap/Nav'
import { ModuleForm } from './ModuleForm';
import { useDataSource } from '../Utils/useDataSource';

const Module = ({moduleName}) => {
  let params = useParams();
  let location = useLocation()
  if (!moduleName) {
    moduleName = params.moduleName
  }
 
  const [moduleParams, setModuleParams] = useState([])
  const [subsections, setSubsections] = useState(['required', 'optional', 'output', 'manual']);
  const [activeSubsection, setActiveSubsection] = useState('required');
  const [sectionParams, setSectionParams] = useState([]);
  console.log("Module", location)
  const module = useDataSource({getDataFunc: grass.routes.Modules.getModule, params: [moduleName]})
  console.log("grass.routes.Modules.getModule", module)
  const filterSectionParams = (params, section) => {
    let filterdParams = params.filter(f => {
      if (section === 'optional' && f.optional && !f.output){
        return f
      }
      else if (section === 'required' && !f.optional && !f.output) {
        return f
      }
      else if (section === 'output' && f.output) {
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

  useEffect(() => {
    if (!module.data || !activeSubsection) return;
      let params = module.data.parameters;
      let outputs = module.data.returns.map(p=> {
        p.output = true
        return p
      })
      let allParams = [...params, ...outputs]
      console.log(params, outputs, allParams)
      setModuleParams(allParams)
      setSectionParams(filterSectionParams(allParams, activeSubsection))
  }, [module.data, activeSubsection])

  useEffect(() => {
    if (!moduleParams || !activeSubsection) return;
    setSectionParams(filterSectionParams(moduleParams, activeSubsection))
  }, [moduleParams, activeSubsection])
  
  return (
    // <Container fluid className="bg-light text-dark">
    //       <Row md={{ span: 6, offset: 3 }} style={{ marginBottom: "2rem" }}>
            <Card>
              <Card.Header>

                <Card.Title>{moduleName}</Card.Title>
                <Card.Text>{module.data ? module.data.description : ""}</Card.Text>
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
              <Card.Body>
              {/* <Row> */}
                { module.data && sectionParams ?
                <Container  className="bg-light text-dark">
                <Row md={{ span: 6, offset: 3 }} style={{ paddingBottom: "1rem", marginBottom: "2rem", marginTop: "1rem" }}>
                  <ModuleForm moduleName={module.data.name} moduleParams={sectionParams}/>
                  </Row>
                  </Container>
                : null}
              {/* </Row> */}
              
              {
                activeSubsection === 'manual' ?
                  <Row>
                    <iframe className="grass-manual" src={manualUrl(moduleName)} title={`Manual Page: ${moduleName}`}></iframe>
                  </Row> 
                  :<></>
              }
              </Card.Body>
            </Card>
    //     </Row>
    // </Container>
  )
}


export default Module

