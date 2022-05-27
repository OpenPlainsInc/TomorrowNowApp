/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/Grass/Locations/LocationInfo.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Tuesday, April 12th 2022, 4:03:28 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */

/**
 * Location Component
 * *******************
 * View Mapsets
 *      - Click to view Details
 * Create Mapset
 * Delete Mapset
 * View Authorized Users
 * Projection Info...
 * 
 */


import React, { } from "react"
// import "./location.scss";


export const LocationInfo = ({ name, projection, region}) => {

  return (
    <div>
      <h2 data-testid="locationNameText">{name}</h2>
      <h3>{projection}</h3>
      <h3>{region}</h3>
    </div>
  )
}
