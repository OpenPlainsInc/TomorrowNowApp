/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/routes/FuturesRouts.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Wednesday, July 6th 2022, 1:12:10 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */

import React from "react"

import {Outlet, Route} from "react-router-dom";
import CreateModelContainer from "../containers/Futures/CreateModel/CreateModelContainer";
import Futures from '../containers/Futures/Futures';
import { ModelDetails } from "../containers/Futures/ModelDetails/ModelDetails";
import ModelDetailsContainer from "../containers/Futures/ModelDetails/ModelDetailsContainer";
import ModelContainer from '../containers/Futures/ModelMap/Model';
const FuturesRoutes = (
  <>
    <Route path="futures/create" element={<CreateModelContainer/> }></Route>
    <Route path="futures/:modelId" element={
      <ModelDetailsContainer>
        <ModelDetails/>
      </ModelDetailsContainer>
      }>
    </Route>
    <Route path="futures/:modelId/scenarios" element={<ModelContainer/>}></Route>
    <Route path="futures" element={<Futures />}></Route>
    {/* <Route path="futures" element={<Futures />}>
      <Route path="create" element={<CreateModelContainer/> }></Route>
      <Route path=":modelId" element={<ModelDetailsContainer/>}>
        <Route path="scenarios" element={<ModelContainer/>}></Route>
      </Route>
    </Route> */}
  </>
)

export default FuturesRoutes
