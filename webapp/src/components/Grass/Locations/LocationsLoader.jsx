/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/Grass/Locations/LocationsLoader.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Wednesday, June 8th 2022, 8:16:56 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */


import React from "react"
import grass from "@openplains/grass-js-client";

import { useDataSource } from "../Utils"

export const LocationsLoader = ({children}) => {
    
    // const grassLocations = useDataSource({getDataFunc: Grass.getLocations})
    const grassLocations = useDataSource({getDataFunc: grass.routes.Locations.getLocations})
    return (
      <>
        {
          React.Children.map(children, child => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {grassLocations})
            }
            return child
          })
        }
      </>
    )
    
}