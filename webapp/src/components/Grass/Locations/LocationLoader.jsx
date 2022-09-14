/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/Grass/Locations/LocationLoader.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Thursday, May 5th 2022, 1:56:39 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */

import React from "react"
// import Grass from "../grass"
import grass from "@openplains/grass-js-client";

import { useDataSource } from "../Utils"

export const LocationLoader = ({locationId, children}) => {
    
    const grassLocation = useDataSource({getDataFunc: grass.routes.Locations.getLocation, params: [locationId]})

    return (
      <>
        {
          React.Children.map(children, child => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {locationId, grassLocation})
            }
            return child
          })
        }
      </>
    )
    
}