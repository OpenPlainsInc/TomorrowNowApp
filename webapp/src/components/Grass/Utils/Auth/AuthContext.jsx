/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/Grass/Utils/Auth/AuthContext.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Monday, June 6th 2022, 1:39:34 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */

import React from "react"

// Create an empty context to hold and pass user auth details through
// component tree. This allows us to avoid passing props to each component.
// https://reactjs.org/docs/context.html
const AuthContext = React.createContext();
export default AuthContext;