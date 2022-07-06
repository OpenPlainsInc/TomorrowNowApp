/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/routes/FuturesRouts.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Wednesday, July 6th 2022, 1:12:10 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */

import React from "react"

import {Route} from "react-router-dom";
import Futures from '../containers/Futures/Futures';

const FuturesRoutes = (
  <>
    <Route path="futures" element={<Futures />} />
  </>
)

export default FuturesRoutes
