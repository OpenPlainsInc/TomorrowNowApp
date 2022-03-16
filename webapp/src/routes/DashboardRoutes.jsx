
import React, { Fragment} from "react"

import {Route} from "react-router-dom";
import Dashboard from '../containers/Dashboard/Dashboard';

const DashboardRoutes = (
  <Fragment>
      <Route path="dashboard" element={<Dashboard />} />
  </Fragment>
)

export default DashboardRoutes



