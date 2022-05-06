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
  const {name, projection, region} = grassLocation || {};

  return grassLocation ? (
    <>
    <h3>{name}</h3>
    </>
  ) : <p>Loading...</p>
}
