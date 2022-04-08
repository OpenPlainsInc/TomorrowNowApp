/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/containers/Settings/SettingsContainer.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Friday, April 8th 2022, 3:00:20 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */


/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/containers/Home/HomeContainer.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Wednesday, March 30th 2022, 1:39:57 am
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */

import React, { Component } from "react"
import {Outlet} from "react-router-dom";
import {LinkContainer} from 'react-router-bootstrap'
import Container from "react-bootstrap/Container"

import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"


/**
 * Task for Anna
 * 1. Add a button
 * 
 */

export default function SettingsContainer() {

    return (
     
       <Container fluid style={{ padding: "1rem 0" }}>
         <header>
          <h2>Settings</h2>
         </header>
          <Row>
            <Col>
            
            </Col>
            <Col>

            </Col>
          </Row>
        </Container>
  
    );
  }
