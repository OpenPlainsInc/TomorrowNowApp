/*
 * Filename: useAuth.js
 * Project: TomorrowNow
 * File Created: Friday June 3rd 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Fri Jun 03 2022
 * Modified By: Corey White
 * -----
 * License: GPLv3
 * 
 * Copyright (c) 2022 TomorrowNow
 * 
 * TomorrowNow is an open-source geospatial participartory modeling platform
 * to enable stakeholder engagment in socio-environmental decision-makeing.
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 * 
 */

import React, { useState } from "react"
import admin from "./admin";
const authContext = React.createContext();


/**
 * Auth hook to authenticate user and restrict routes
 * @returns
 */
export const useAuth = () => {
    const [authed, setAuthed] = useState(false);
    return {
        authed,
        async login({username, password}) {
          // Attempt log in for user 
          let res = await admin.login({username, password})
          // Set the auth state from the response
          setAuthed(res.auth)
          return res
        },
        logout() {
          return new Promise((res) => {
            setAuthed(false);
            res();
          });
        },
    };
    
}

export function AuthProvider({ children }) {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return React.useContext(authContext);
}