/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/routes/LocationRoutes.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Wednesday, June 8th 2022, 8:35:17 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */



import React from "react"

import {Route} from "react-router-dom";
import Locations from '../containers/Locations/Locations';

const LocationRoutes = (
  <>
      <Route path="locations" element={<Locations />} />
  </>
)

export default LocationRoutes



