/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/routes/AuthRoutes.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Friday, May 13th 2022, 11:01:48 am
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */


import React, { Fragment } from "react"

import { Route } from "react-router-dom";
import Login from '../containers/Auth/Login';
import ResetPassword from "../containers/Auth/ResetPassword";
import Signup from "../containers/Auth/Signup";


const AuthRoutes = (
  <Fragment>
    <Route path="login" element={<Login /> } />
    <Route path="signup" element={<Signup /> } />
    <Route path="reset" element={<ResetPassword /> } />
  </Fragment>
)

export default AuthRoutes