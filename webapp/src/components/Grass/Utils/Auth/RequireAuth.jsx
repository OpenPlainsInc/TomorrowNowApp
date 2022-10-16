/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/Grass/Utils/Auth/RequireAuth.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Friday, June 3rd 2022, 3:22:31 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */

import {useAuthContext} from "./useAuthContext"
import { Navigate, useLocation } from "react-router-dom"

export const RequireAuth = ({ children }) => {
  const context = useAuthContext();
    if (context === undefined || context === null) {
      return <Navigate to="/login" replace />
    }
    return children;
}