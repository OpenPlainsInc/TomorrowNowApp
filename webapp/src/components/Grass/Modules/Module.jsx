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
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Grass from '../grass'
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
  const module = useDataSource(Grass.g.modules.get(moduleName))
  console.log("Module Data", module)

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

  useEffect(() => {
    if (!module) return;
      let params = module.parameters;
      setModuleParams(params)
      setSectionParams(filterSectionParams(params, activeSubsection))
  }, [module])

  useEffect(() => {
    if (!moduleParams || !activeSubsection) return;
    setSectionParams(filterSectionParams(moduleParams, activeSubsection))
  }, [moduleParams, activeSubsection])
  
  return (
    <Container fluid className="bg-light text-dark">
          <Row style={{ marginBottom: "2rem" }}>
            <Card>
              <Card.Body>
                <Card.Title>{moduleName}</Card.Title>
                <Card.Text>{module ? module.description : ""}</Card.Text>
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
            { module && sectionParams ?
              <ModuleForm moduleName={module.name} moduleParams={sectionParams}></ModuleForm>
            : null}
          </Row>
          
          {
            activeSubsection === 'manual' ?
              <Row>
                <iframe className="grass-manual" src={manualUrl(moduleName)} title={`Manual Page: ${moduleName}`}></iframe>
              </Row> 
              :<Row></Row>
          }
       
    </Container>
  )
}


export default Module

