import React, { Component } from "react"
import MapWrapper from './MapWrapper';
import {Outlet, Link } from "react-router-dom";

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

    // async componentDidMount() {
    //   try {
    //     const res = await fetch('http://localhost:8005/world/countries/');
    //     const todoList = await res.json();
    //     console.log("TODO:", todoList.results.features)
    //     const todoListFeatures = todoList.results.features

    //     const res2 = await fetch('http://localhost:8005/world/info/');
    //     const info = await res2.json();
    //     console.log("Info:", info)
        
    //     this.setState({
    //       todoList: todoListFeatures,
    //       // mainMap: MainMap
    //     });
        
    //   } catch (e) {
    //     console.log(e);
    // }
    // }
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
        <main className="content">
            
         <div className="row">
           <div className="col-md-6 col-sm-10 mx-auto p-0">
           <div className="card p-3">
               <ul className="list-group list-group-flush">
                 {/* {this.renderItems()} */}
                 
              </ul>
              
            </div>
          </div>
         </div>
         <nav>
         <Link to="/">Home</Link> | {" "}
          <Link to="/world">World</Link> | {" "}
          <Link to="/dashboard">Dashboard</Link>
         </nav>
         <Outlet />
       </main>
      
      )
    }
  }
  
export default App;