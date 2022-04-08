/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/routes/SettingsRoutes.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Friday, April 8th 2022, 3:02:34 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */



import React, { Fragment } from "react"

import { Route } from "react-router-dom";
import SettingsContainer from '../containers/Settings/SettingsContainer';

const SettingsRoutes = (
  <Fragment>
     <Route path="settings" element={<SettingsContainer /> } />
  </Fragment>
)

export default SettingsRoutes



