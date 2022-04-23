/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/Grass/Modules/Modules.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Friday, April 22nd 2022, 11:42:56 am
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */


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
import {Outlet} from "react-router-dom";

import './module.scss';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import Nav from 'react-bootstrap/Nav'
import Grass from '../grass'
import ModuleCard from './ModuleCard'


const Modules = () => {
    
    const [modules, setModules] = useState([]);
    const [categories, setCategories] = useState([]);
    const [families, setFamilies] = useState({
        'g': {
            id: 'general',
            family: 'g',
            description: 'Grass modules that manage general GRASS commands.',
            icon: 'fa-gear'
        },
        'r': {
            id: 'raster',
            family: 'r',
            description: 'Grass modules for raster data analysis.',
            icon: 'fa-border-all'
        },
        'r3': {
            id: 'raster3d',
            family: 'r3',
            description: 'Grass modules for 3d raster data analysis.',
            icon: 'fa-cubes'
        },
        't': {
            id: 'temporal',
            family: 't',
            description: 'Grass modules for temporal data analysis.',
            icon: 'fa-timeline'
        },
        'd': {
            id: 'display',
            family: 'd',
            description: 'Grass modules that manage displaying data',
            icon: 'fa-display'
        },
        'db': {
            id: 'database',
            family: 'db',
            description: 'Grass modules that manage databases.',
            icon: 'fa-database'
        },
        'v': {
            family: 'v',
            id: 'vector',
            description: 'Grass modules for vector data analysis.',
            icon: 'fa-vector-square'
        },
        'i': {
            id: 'imagery',
            family: 'i',
            description: 'Grass modules for imagery analysis.',
            icon: 'fa-satellite'
        },
        'm': {
            id: 'misc',
            family: 'm',
            description: 'Grass modules for m.',
            icon: 'fa-atom'
        },
        // 'ps': {
        //     id: 'ps',
        //     family: 'ps',
        //     description: 'Grass modules for ps.',
        //     icon: 'fa-qustion'
        // },
        // 'test': {
        //     id: 'tests',
        //     family: 'tests',
        //     description: 'Grass modules for testing.',
        //     icon: 'fa-vial'
        // }
    });
    const [family, setFamily] = useState('g');
    const [activeFamily, setActiveFamily] = useState(families.g);

    // function createCategoryList(x) {
    //     const catSet = new Set()
    //     const catDict = x.categories.map(c => {c: c})
    //     catSet.add(catDict)
    //     return catSet
    // }
    const handleSelect = (eventKey) => {
        setFamily(eventKey)
        setActiveFamily(families[eventKey])
    }


    useEffect(() => {
        let isMounted = true;   
        (async () => {
            let res = await Grass.g.modules.all({family})
            let data = res.response.processes
            console.log(data)
            setModules(data)
            return () => { isMounted = false }   
        })()    
      }, [family])

  
        return (
          <Container fluid className="bg-light text-dark">
              <Row style={{ marginBottom: "2rem" }}>
                <Card >
                    <Card.Header>
                        <Nav variant="tabs" activeKey={activeFamily.family} onSelect={handleSelect}>
                        {
                            Object.values(families).map((c, idx) => {
                                return(
                                    <Nav.Item key={idx}>
                                        <Nav.Link eventKey={c.family}>{c.id}</Nav.Link>
                                    </Nav.Item>
                                )
                            })
                        }
                        </Nav>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>
                            {/* <span className={`fa-solid ${activeFamily.icon}`}> </span> */}
                            {activeFamily.id}
                        </Card.Title>
                        <Card.Text>
                            {activeFamily.description}
                        </Card.Text>
                    </Card.Body>
                </Card>
              </Row>
              <Row>
              <Outlet />
              { modules.map( (m, idx) => { 
                return(       
                    <Col key={idx} md={3}>
                        <ModuleCard module={m} icon={activeFamily.icon}></ModuleCard>
                    </Col>     
                )
                })}
            </Row>
          </Container>
        )
  }


export default Modules

