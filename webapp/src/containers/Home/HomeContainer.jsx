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

export default function HomeContainer() {

    return (
        <main className="bg-light text-dark" style={{
            height:'100vh'
        }}>
       <Container fluid>
          <Row className="bg-image p-5 text-center shadow-1-strong rounded mb-5 text-white"
        style={{ 
           paddingRight:'0px',
           paddingLeft:'0px',
           backgroundImage: "url('home_banner_scaled.jpg')",
           height: '500px',
           backgroundRepeat: "no-repeat",
           backgroundSize: "cover"
          }}>
            <Col>
              <div className='mask' style={{ backgroundColor: 'rgba(30, 30, 30, 0.4)' }}>
                <div className='d-flex justify-content-center align-items-center h-100'>
                  <div className='text-white'>
                    <h1 className='mb-3'>TomorrowNow</h1>
                    <h4 className='mb-3'>Prepare for an Uncertain Tomorrow Now</h4>
                    <LinkContainer to="/game">
                        <Button variant="outline-light btn-lg">Play Now</Button>
                    </LinkContainer>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col md={4}>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" className="fa-solid fa-people-pulling fa-5x"/>
                <Card.Body>
                  <Card.Title>Community Engagment</Card.Title>
                  <Card.Text>
                    Don't let your ideas go unheard. 
                    You know the area where you work, live, and play best. 
                    So share your insights and let your knowledge make a positive impact in your community.
                  </Card.Text>
                  <Button variant="primary">Engage Here</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="" className="fa-solid fa-tree-city fa-5x" />
                <Card.Body>
                  <Card.Title>Urban Development</Card.Title>
                  <Card.Text>
                    You should have seen this place 5 years ago...
                    Urban development is rapily changing your town.
                    Sometimes you like it and sometimes you do not.
                    Either way its impacts can be felt in unexpected ways.
                  </Card.Text>
                  <Button variant="primary">Build Something</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="" className="fa-solid fa-person-drowning fa-5x"/>
                <Card.Body>
                  <Card.Title>Flooding</Card.Title>
                  <Card.Text>
                    Swimming is great, but it is probably not what you want to do on your way to work or in your living room.
                    Or, maybe that sounds great to you. No judgement. Well maybe alittle. 
                    Thankfully, we have you to help keep people dry in their living rooms and wet at the pool and lake.
                  </Card.Text>
                  <Button variant="primary">Go for a Swim</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        </main>
    );
  }
