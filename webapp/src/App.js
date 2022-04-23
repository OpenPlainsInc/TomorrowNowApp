import React, { Component } from "react"
import {Outlet} from "react-router-dom";
import {LinkContainer} from 'react-router-bootstrap'
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"

// import Jumbotron from 'react-bootstrap/Jumbotron'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      activeItem: {
        title: "",
        description: "",
        completed: false
      },
      todoList: [],
      mainMap: undefined
      };
  }

    render() {
      return (
        // <main className="content">
            
         <main>
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
            <LinkContainer to="/world">
              <Nav.Link>World</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/board">
              <Nav.Link>Board</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/modules">
              <Nav.Link>Modules</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/dashboard">
              <Nav.Link>Dashboard</Nav.Link>
            </LinkContainer>
          </Nav>

          <Nav className="justify-content-end" 
          // activeKey="/home"
          >
            <LinkContainer to="/settings">
              <Nav.Link>Settings</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
          </Nav>
          </Container>
        </Navbar>

       
       
        </Container>
       
        {/* <HomeContainer></HomeContainer> */}
        <Outlet />
      </main>

      )
    }
  }
  
export default App;