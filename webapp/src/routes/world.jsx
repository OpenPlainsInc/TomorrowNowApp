import React, { useState, useEffect } from "react"
import MapWrapper from '../MapWrapper';
import {Outlet, NavLink } from "react-router-dom";

const World = () => {

    const [countries, setCountries] = useState(0)

    useEffect(() => {
        async function fetchCountries() {
            try {
                const res = await fetch('http://localhost:8005/world/countries/');
                const data = await res.json();
                console.log("response:", data.results.features)
                const countriesData = data.results.features
                setCountries(countriesData)
                
              } catch (e) {
                console.log(e);
            }
        }
        fetchCountries()
      }, [])

     const renderItems = (data) => {
    
        console.log("Render Items Data", data)
        return data.map(item => (
          <li 
            key={item.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
             <MapWrapper key={item.id} className="map-container" features={item} />
            <span 
              title={item.properties.area}
              >
                
                {item.properties.name} <br></br>
                Area: {item.properties.area} <br></br>
                Population: {item.properties.pop2005} <br></br>
                <NavLink to={`/world/${item.properties.un}`} key={item.properties.un} state={item.properties}> {item.properties.name} </NavLink>
              </span>
             
          </li>
        ));
      };
  
        return (
          <main className="content">
              
           <div className="row">
             <div className="col-md-6 col-sm-10 mx-auto p-0">
             <div className="card p-3">
                 <ul className="list-group list-group-flush">
                   {countries ? renderItems(countries) : []}
                </ul>
                
              </div>
            </div>
           </div>
          
           <Outlet />
         </main>
        
        )
 
  }


export default World