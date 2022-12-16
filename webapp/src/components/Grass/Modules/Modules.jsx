/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/Grass/Modules/Modules.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Tuesday, April 12th 2022, 4:05:44 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */


// react
import React, { useState, useEffect } from 'react';
import {useParams, Outlet, useNavigate, useLocation, useSearchParams} from "react-router-dom";

import './module.scss';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row'
import FormControl from 'react-bootstrap/FormControl'
import Card from 'react-bootstrap/Card'
import InputGroup from 'react-bootstrap/InputGroup'
import Nav from 'react-bootstrap/Nav'
import Fade from 'react-bootstrap/Fade'

import ModuleFamily from './ModuleFamily';
 

const Modules = () => {
    let params = useParams()
    let location = useLocation()
    // let [searchParams, setSearchParams] = useSearchParams({family: 'g'});

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
    const [family, setFamily] = useState(params.familyName || 'g');
    console.log("Init: Family", family)
    const [activeFamily, setActiveFamily] = useState(families[family]);
    const [searchValue, setSearchValue] = useState("");

    let navigate = useNavigate();
    console.log("Modules", location)
    const handleSelect = (eventKey) => {
        setFamily(eventKey)
        setActiveFamily(families[eventKey])
        setSearchValue("")
        navigate(`/modules/${eventKey}`, {state: {routeName:"module_family"}});
    }

    const filterModules = (e) => {
        e.preventDefault()
        let newVal = e.target.value
        console.log("Filter Modules", newVal)
        if (newVal.length >=2) {
            setSearchValue(newVal)
        } else {

        }
    }

        return (
          <Container fluid className="bg-light text-dark">
        {/* //       <Row style={{ marginBottom: "2rem" }}> */}
            <Row style={{ marginBottom: "2rem" }}>
                <Card variant="secondary">
                    <Card.Header>
                        <Nav variant="tabs" activeKey={activeFamily.family} onSelect={handleSelect}>
                        {
                            Object.values(families).map((c, idx) => {
                                return(
                                    <Nav.Item key={idx}>
                                        <Nav.Link 
                                            eventKey={c.family}
                                            >{c.id}</Nav.Link>
                                    </Nav.Item>
                                )
                            })
                        }
                        </Nav>
                       
                    </Card.Header>
                    { location.state ?
                    <Card.Body>
                        <Card.Title>
                            {activeFamily.id}
                        </Card.Title>
                        <Card.Text>
                            {activeFamily.description}
                        </Card.Text>
                        
                       
                         
                            <InputGroup className="mb-3" style={{marginTop: 20}}>
                                <InputGroup.Text id="module_search"><i className="fa-solid fa-magnifying-glass"></i></InputGroup.Text>
                                <FormControl
                                placeholder="Search Data"
                                aria-label="Search"
                                aria-describedby="module_search"
                                onChange={filterModules}
                                />
                            </InputGroup>
                       
                      
                        
                    </Card.Body>
                     : null
                    }
                </Card>

                <ModuleFamily family={family} icon={activeFamily.icon} filter={searchValue}>  </ModuleFamily>
                <Outlet/>
           
           
            </Row>
        </Container>
          
        )
  }


export default Modules

