/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/Grass/Modules/ModuleFamily.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Tuesday, April 12th 2022, 4:05:44 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */


// react
import React, { useState, useEffect } from 'react';
import {useParams, useLocation} from "react-router-dom";

import './module.scss';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Grass from '../grass'
import ModuleCard from './ModuleCard'


const ModuleFamily = ({icon, family, filter}) => {   
    let params = useParams()
    let location = useLocation()
    console.log("Module Family location.state", location.state)
    const [modules, setModules] = useState([])
    const [modulesCopy, setModulesCopy] = useState([])
    // const [activeFamily, setActiveFamily] = useState(family || params.familyName)
    
    useEffect(() => {
        let isMounted = true;   
        (async () => {
            let res = await Grass.g.modules.all({family})
            let data = res.response.processes
            console.log(data)
            setModules(data)
            setModulesCopy(data)
            return () => { isMounted = false }   
        })()    
        }, [family])

    useEffect(() => {
        if (!modules) return;
        if (params.moduleName) {
            modules.filter(m=> m === params.moduleName)
        }

    },[params])

    const filterModules = (moduleName) => {
       if (params.moduleName) {
        return moduleName === params.moduleName
       } else {
        return moduleName
       }
       
    }

    const textSearchFilter = (module, filterValue) => {
       
        if (!filterValue | filterValue.length < 3) return true;
        let val = filterValue.toLowerCase()
        let categoryFilter = module.categories.filter(c => {
            return c.toLowerCase().includes(val)
        })
        
       if (module.id.toLowerCase().includes(val)) {
        return true;
       } 
       
       if (categoryFilter.length > 0) {
        return true;
       } 
 
    }

    /**
     * Reset modules from copy
     */
    useEffect(() => {
        if (!filter) {
            // console.log("Reset Modules Array (!filter")
            setModules(modulesCopy)
        }
        if (filter.length < 3) {
            // console.log("Reset Modules Array (< 3")
            setModules(modulesCopy)
        }
    }, [modules, filter])


        return (
          <Container fluid className="bg-light text-dark">
            <Row>
              { modules.filter(filterModules).filter(m => textSearchFilter(m, filter)).map( (m, idx) => { 
                return(       
                    <Col key={idx} md={3}>
                        <ModuleCard module={m} icon={icon}></ModuleCard>
                    </Col>     
                )
                })}
                
            </Row>
            
          </Container>
        )
  }


export default ModuleFamily

