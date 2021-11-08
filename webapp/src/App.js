import React, { Component } from "react"
// import GeoJSON from 'ol/format/GeoJSON';
// import Map from 'ol/Map';
// import VectorLayer from 'ol/layer/Vector';
// import VectorSource from 'ol/source/Vector';
// import View from 'ol/View';
// import XYZ from 'ol/source/XYZ'
// import TileLayer from 'ol/layer/Tile'
import MapWrapper from './MapWrapper';

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

    async componentDidMount() {
      try {
        const res = await fetch('http://localhost:8000/world/countries/');
        const todoList = await res.json();
        console.log("TODO:", todoList.results.features)
        const todoListFeatures = todoList.results.features
        

        // let countries = new VectorLayer({
        //   source: new VectorSource({
        //     format: new GeoJSON()
        //   }) //.addFeatures(todoListFeatures)
        // })

        // // USGS Topo
        // const usgstop = new TileLayer({
        //   source: new XYZ({
        //     url: 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}',
        //   })
        // });

        // const MainMap = new Map({
        //   target: 'map-container',
        //   layers: [countries, usgstop],
        //   view: new View({
        //     center: [0, 0],
        //     zoom: 2,
        //   })
        // });
        this.setState({
          todoList: todoListFeatures,
          // mainMap: MainMap
        });
        
      } catch (e) {
        console.log(e);
    }
    }
    renderItems = () => {
      const { viewCompleted } = this.state;
      const newItems = this.state.todoList;
      // this.state.mainMap.updateSize()
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
                 {this.renderItems()}
                 
              </ul>
              
            </div>
          </div>
         </div>
         
       </main>
      
      )
    }
  }
  
export default App;