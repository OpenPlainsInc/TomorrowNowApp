import React, { useState, useEffect } from "react"
import MapWrapper from '../../components/MapWrapper';
import {Outlet, Link, useParams, useLocation } from "react-router-dom";

const Country = (props) => {
    let params = useParams();
    const [country, setCountry] = useState(0)
    const location = useLocation()
    const { from } = location.state
    console.log("Country Props:", from)

    useEffect(() => {
        let isMounted = true; 
        async function fetchCountry() {
            try {
                let queryParams = {un: params.unId}
                let url = new URL('http://localhost:8005/world/countries/')
                url.search = new URLSearchParams(queryParams).toString();
                const res = await fetch(url);
                const data = await res.json();
                console.log("response:", data.results.features)
                const countryData = data.results.features[0]
                // const res2 = await fetch('http://localhost:8005/world/info/');
                // const info = await res2.json();
                if (isMounted) setCountry(countryData)
                
              } catch (e) {
                console.log(e);
            }
            return () => { isMounted = false }
        }
        fetchCountry()
      }, [])
  
        return (
          <main className="content">
              
           <div className="row">
             <div className="col-md-6 col-sm-10 mx-auto p-0">
             <div className="card p-3">
            {country ? <MapWrapper key={params.unId} className="map-container" features={country} /> : <div></div>}
                
              </div>
            </div>
           </div>
           <Outlet />
         </main>
        
        )
 
  }


export default Country