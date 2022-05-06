/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/Grass/Locations/LocationLoader.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Thursday, May 5th 2022, 1:56:39 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */

import React, { useState } from "react"
import Grass from "../grass"

export const LocationLoader = ({locationId, children}) => {
    const [grassLocation, setGrassLocation] = useState(null)

    useEffect(() => {
      (async ()=> {
        let response = await Grass.getLocation(locationId)
        setGrassLocation(Object.assign(response, {name: locationId}))
      })()
    }, [locationId])

    return (
      <>
        {
          React.Children.map(children, child => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {grassLocation})
            }
            return child
          })
        }
      </>
    )
    
}