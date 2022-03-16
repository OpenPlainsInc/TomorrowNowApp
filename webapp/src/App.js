import React, { Component } from "react"
import MapWrapper from './MapWrapper';
import {Outlet, Link} from "react-router-dom";
import {LinkContainer} from 'react-router-bootstrap'
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"


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

   
    renderItems = () => {
      const { viewCompleted } = this.state;
      const newItems = this.state.todoList;
    
      console.log("Render Items", this.state)
      return newItems.map(item => (
        <li 
          key={item.id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
           <MapWrapper key={item.id} className="map-container" features={item} />
          <span 
            className={`todo-title mr-2 ${
              this.state.viewCompleted ? "completed-todo" : ""
            }`}
            title={item.properties.area}
            >
              
              {item.properties.name} <br></br>
              Population: {item.properties.pop2005} <br></br>
              Area: {item.properties.area} <br></br>
              <Link to={`/country/${item.id}`}> {item.properties.name} </Link>
            </span>
           
        </li>
      ));
    };

    render() {
      return (
        // <main className="content">
            
         
        <Container fluid className="bg-light text-dark">
         <Navbar bg="primary" variant="dark" fixed="top">
         <Container fluid>
          <Navbar.Brand>TomorrowNow</Navbar.Brand>
          <Nav className="me-auto">
            <LinkContainer to="/">
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
            <LinkContainer to="/dashboard">
              <Nav.Link>Dashboard</Nav.Link>
            </LinkContainer>
          </Nav>
          </Container>
        </Navbar>
        <Outlet />
        </Container>
      //  </main>
      
      )
    }
  }
  
export default App;