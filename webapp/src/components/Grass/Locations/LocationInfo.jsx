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


import React, { useState, useEffect } from "react"
import { parserProjection } from "../Utils/jsonparsers"
// import "./location.scss";

export const LocationInfo = ({locationId, grassLocation}) => {
  const [locationInfo, setLocationInfo] = useState(null)
  let errors = grassLocation.errors

  useEffect(() => {
    if (!grassLocation.data || locationInfo) return;
      setLocationInfo(grassLocation.data.processResults)
  }, [grassLocation, locationInfo])

  return (
    <div>
    { 

      locationInfo ?
          <>
            <h1 data-testid="locationNameText">{locationId}</h1>
            <code>{JSON.stringify(parserProjection(locationInfo.projection, ","), null, 2)}</code>
            <pre>{JSON.stringify(locationInfo.region, null, 2)}</pre>
          </>
      : errors ? <p>{errors}</p> : <></>
    }
    </div>
  )
}
