/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/containers/TopNavbar/TopNavBar.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Monday, June 6th 2022, 2:05:17 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */
import {LinkContainer} from 'react-router-bootstrap'
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import useAuth from "../../components/Grass/Utils/Auth/useAuth"
import { RequireAuth } from "../../components/Grass/Utils/Auth/RequireAuth";

export const TopNavbar = () => {
    
    const { authed } = useAuth();

    return (
        <Container fluid className="bg-light text-dark">
         <Navbar bg="primary" variant="dark" fixed="top">
         <Container fluid>
          <Navbar.Brand>TomorrowNow</Navbar.Brand>
          <Nav className="me-auto">
            <LinkContainer to="/home">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/game">
              <Nav.Link>Game</Nav.Link>
            </LinkContainer>
            {/* <LinkContainer to="/world">
              <Nav.Link>World</Nav.Link>
            </LinkContainer> */}
            <LinkContainer to="/board">
              <Nav.Link>Board</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/locations">
              <Nav.Link>Locations</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/modules/g">
              <Nav.Link>Modules</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/dashboard">
              <Nav.Link>Dashboard</Nav.Link>
            </LinkContainer>
          </Nav>

          <Nav className="justify-content-end">
            <LinkContainer to="/settings">
              {/* <RequireAuth> */}
                <Nav.Link>Settings</Nav.Link>
              {/* </RequireAuth> */}
            </LinkContainer>
          { !authed ? ( 
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
            ) : (
            <LinkContainer to="/logout">
              <Nav.Link>Logout</Nav.Link>
            </LinkContainer>
            )
          }
          </Nav>
          </Container>
        </Navbar>

       
       
        </Container>
    )
}