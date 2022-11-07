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
import grass from "@openplains/grass-js-client";
import ModuleCard from './ModuleCard'
import GrassLocalPagination from '../Utils/GrassLocalPagination';


const ModuleFamily = ({icon, family, filter}) => {   
    let params = useParams()
    let location = useLocation()
    let [customLocation, setCustomLocation] = useState({state: "family"})
    console.log("Module Family location.state", location.state)
    const [modules, setModules] = useState([])
    const [modulesCopy, setModulesCopy] = useState([])
    const [modulePageViewLimit, setModulePageViewLimit] = useState(12)
    const [currentPage, setCurrentPage] = useState(1)
    const [pageTotal, setPageTotal] = useState(1)
    const [pageStart, setPageStart] = useState(0)
    const [pageEnd, setPageEnd] = useState(modulePageViewLimit)

    const changePageTo = (page) => {
        console.log("Page Change", page)
        setCurrentPage(page)
        let newStart = (page - 1) * modulePageViewLimit
        let newEnd = newStart + modulePageViewLimit
        console.log("New Start", newStart, "New End", newEnd)
        setPageStart(newStart)
        setPageEnd(newEnd)
    }

    // Reset Pagination when family changes via tab
    const resetPagination = () => {
        setCurrentPage(1)
        setPageStart(0)
        setPageEnd(modulePageViewLimit)
    }

    // Listen for a family updates to trigger reset
    useEffect(() => {  
        console.log("UE: Module Family location.state", location, customLocation)
        if (!family) return;
        resetPagination() 
    }, [family])

    // Request Modules from API
    useEffect(() => {
        let isMounted = true;   
        (async () => {
            // let res = await Grass.g.modules.all({family})
            let res = await grass.routes.Modules.getModules({family})
            let data = res.processes
            console.log(data)
            setModules(data)
            setModulesCopy(data)
            return () => { isMounted = false }   
        })()    
        }, [family])

    // Filter Modules by family
    useEffect(() => {
        if (!modules) return;
        if (params.moduleName) {
            modules.filter(m=> m === params.moduleName)
        }

    },[params])

    // Set up pagination
    useEffect(() => {
        if (!modules) return;
        let filteredModuleCount = modules.filter(filterModules).filter(m => textSearchFilter(m, filter)).length
        let totalPages = Math.ceil(filteredModuleCount / modulePageViewLimit)
        setPageTotal(totalPages)
        resetPagination()
        
    }, [filter, modules])

    const filterModules = (moduleName) => {
       if (params.moduleName) {
        return moduleName === params.moduleName
       } else {
        return moduleName
       }
       
    }

    // Search Module names and keys
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
              { modules.filter(filterModules).filter(m => textSearchFilter(m, filter)).slice(pageStart, pageEnd).map( (m, idx) => { 
                return(       
                    <Col key={idx} md={2}>
                        <ModuleCard module={m} icon={icon}></ModuleCard>
                    </Col>     
                )
                })}
                
            </Row>
            { 
                location.state ?
            <Row>
                <GrassLocalPagination 
                    onPageChange={changePageTo}
                    pageStart={pageStart} 
                    pageEnd={pageEnd}
                    pageTotal={pageTotal}
                    currentPage={currentPage}
                    limit={modulePageViewLimit}>
                </GrassLocalPagination>
            </Row>
              : null  }
          </Container>
        )
  }


export default ModuleFamily

