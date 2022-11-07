/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/Grass/Modules/ModuleCard.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Tuesday, April 12th 2022, 4:05:44 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */


// react
import React, { useState, useEffect } from 'react';
import {LinkContainer} from 'react-router-bootstrap'
import './module.scss';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import Nav from 'react-bootstrap/Nav'
import Grass from '../grass'

/**
 * React-Bootstrap Card to display GRASS module info.
 * @param {*} module 
 * @returns 
 */

const ModuleCard = ({module, icon}) => {
  
        return (
            <Card key={module.id} style={{ width: 'auto' }} className="mb-2">
                <Card.Img variant="top" src="" className={`fa-solid ${icon} fa-5x`} style={{ paddingTop: '2rem' }}/>
                <Card.Body>
                    <Card.Title>{module.id}</Card.Title>
                    <Card.Text>{module.description}</Card.Text>
                    <LinkContainer to={`${module.id}`} state={{routeName:"module"}}>
                        <Button variant="outline-secondary" size="md" className="align-self-end">View Module</Button>
                    </LinkContainer> 
                        <p>
                            { 
                                module.categories.map(c => {
                                    return (
                                    <Badge size="sm" key={c} bg="secondary">{c}</Badge>
                                    )
                                })
                            }
                        </p>
                </Card.Body>
            </Card>
        )
  }


export default ModuleCard




