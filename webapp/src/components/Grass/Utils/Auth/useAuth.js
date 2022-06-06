/*
 * Filename: useAuth.js
 * Project: TomorrowNow
 * File Created: Friday June 3rd 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Mon Jun 06 2022
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
import AuthContext from "./AuthContext";
import admin from "./admin";
import { useLocalStorage } from "../useLocalStorage";

/**
 * Auth hook to authenticate user and restrict routes
 * @returns
 */
function useAuth() {
    // const [authed, setAuthed] = useState(false);
    const [authed, setAuthed] = useLocalStorage('authed', false)
    const login = async ({username, password}) => {
      let res = await admin.login({username, password})
      // Set the auth state from the response
      setAuthed(res.auth)
      return res
    }

    const logout = async () => {
      let res = await admin.logout()
      // Set the auth state from the response
      setAuthed(false);
      return res
    }


    return {
        authed,
        login,
        logout() {
          return new Promise((res) => {
            setAuthed(false);
            res();
          });
        },
    };
    
}

// Passes AuthContext into childern so they recieve updates in context.
// Updating AuthContext will trigger a rerender in all subscribed components. 
export function AuthProvider({ children }) {
  const auth = useAuth();
  console.log(auth)
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export default function AuthConsumer() {
  return React.useContext(AuthContext);
}