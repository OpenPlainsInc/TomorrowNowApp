/*
 * Filename: AuthProvider.js
 * Project: TomorrowNow
 * File Created: Thursday October 13th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Fri Oct 14 2022
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
import { useState, useEffect } from 'react';
// import { getUser } from './auth.js'
import AuthContext from './AuthContext'
import { useLocalStorage } from '../useLocalStorage';
// import {useToken} from './useToken'
// Passes AuthContext into childern so they recieve updates in context.
// Updating AuthContext will trigger a rerender in all subscribed components. 
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser, removeUser] = useLocalStorage('user', null)
    // const { token } = useToken()
    // const [currentUser, setCurrentUser] = useState(user);

    // useEffect(() => {
    //     setCurrentUser(currentUser)
    // }, [currentUser]);
 
    return (
        <AuthContext.Provider value={{
            currentUser,
            setCurrentUser,
            removeUser
        }}>
            {children}
        </AuthContext.Provider>
    );
  }
  