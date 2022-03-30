/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/routes/HomeRoutes.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Wednesday, March 30th 2022, 1:47:36 am
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */



import React, { Fragment} from "react"

import { Route } from "react-router-dom";
import HomeContainer from '../containers/Home/HomeContainer';

const HomeRoutres = (
  <Fragment>
    <Route path="home" element={<HomeContainer /> } />
  </Fragment>
)

export default HomeRoutres



