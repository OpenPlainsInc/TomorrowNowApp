
import React, { Fragment } from "react"

import { Route } from "react-router-dom";
import World from "../containers/World/World"
import Country from '../containers/World/Country';

const BoardRoutes = (
  <Fragment>
     <Route path="world/:unId" element={<Country /> } />
     <Route path="world" element={<World />} /> 
  </Fragment>
)

export default BoardRoutes



