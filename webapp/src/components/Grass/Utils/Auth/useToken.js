/*
 * Filename: useToken.js
 * Project: TomorrowNow
 * File Created: Thursday October 13th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Sun Oct 16 2022
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

import { useState } from 'react';
// import { useLocalStorage } from "../useLocalStorage";
 
export const useToken = () => {
    const TOKEN_KEY = 'token';
    // const [token, setToken, clearToken] = useLocalStorage('token', null)

    const getToken = () => {
        const tokenString = localStorage.getItem(TOKEN_KEY);
        const userToken = JSON.parse(tokenString);
        return userToken
    };


    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        localStorage.setItem(TOKEN_KEY, JSON.stringify(userToken));
        setToken(userToken);
    };

    const clearToken = () => {
        localStorage.removeItem(TOKEN_KEY);
    }

    /**
     * Checks if token is expired
     * @param {string} token 
     * @param {string} expiry 
     * @returns {boolean}
     */
     const isTokenValid = () => {
        if (!token) return false;
        // console.log(token)
        const expiryDate = new Date(token.expiry).getTime()
        const now = new Date().valueOf();
        // console.log(expiryDate, now)
        if (expiryDate > now) {
            // console.log("Token is valid")
            return true;
        } else {
            // console.log("Token is expired")
            clearToken()
            return false;
        }
    }

    return {
        token,
        setToken: saveToken,
        clearToken,
        isTokenValid
    }
}