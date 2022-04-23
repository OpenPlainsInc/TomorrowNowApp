/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/routes/ModuleRoutes.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Friday, April 22nd 2022, 12:17:08 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */


import React, { Fragment} from "react"

import { Route } from "react-router-dom";
import ModulesContainer from '../containers/Modules/ModulesContainer';
import Module from "../components/Grass/Modules/Module";

const ModuleRouters = (
  <Fragment>
    <Route path="modules" element={<ModulesContainer /> } />
    <Route path="modules/:moduleName" element={<Module /> } />
  </Fragment>
)

export default ModuleRouters