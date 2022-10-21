/*
 * Filename: useAuth.js
 * Project: TomorrowNow
 * File Created: Friday June 3rd 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Thu Oct 20 2022
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
import auth from "./auth";
import { useLocalStorage } from "../useLocalStorage";
import { useToken } from "./useToken";

/**
 * Auth hook to authenticate user and restrict routes
 * @returns
 */
export const useAuth = () => {
    const [currentUser, setCurrentUser, removeUser] = useLocalStorage('user', null)
    const {token, setToken, clearToken, isTokenValid} = useToken()
    const isAuthenticated = () => {
      let isValid = isTokenValid(token)
      return isValid;
    }
    const [authed, setAuthed] = useState(isAuthenticated())

    const clearAuthFromLocalStorage = () => {
        clearToken();
        setAuthed(false)
        removeUser()
    }

    const saveCurrentUserContext = async (token) => {
      let user = await auth.getUser(token)
      console.log(user)
      setCurrentUser(user)
      return user
    }

    const login = async ({username, password}) => {
      let res = await auth.login({username, password})
      // Set the auth state from the response
      setToken({token: res.token, expiry: res.expiry})
      setAuthed(isTokenValid())
      saveCurrentUserContext(res)
      return res
    }

    const logout = async () => {
      if (authed) {
        let res = await auth.logout(token)
        console.log("Logout Response:", res)
        clearAuthFromLocalStorage()
        return res;
      }
      clearAuthFromLocalStorage()
      let fakeRes = await null;
      return fakeRes
    }




    return {
        login,
        logout,
        authed,
        currentUser
    };
    
}
