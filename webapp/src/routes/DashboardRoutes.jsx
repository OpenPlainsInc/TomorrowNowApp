
import React from "react"
import {Route} from "react-router-dom";
import Dashboard from '../containers/Dashboard/Dashboard';
const DashboardRoutes = (
  <>
      <Route path="dashboard" element={<Dashboard />} />
  </>
)

export default DashboardRoutes



