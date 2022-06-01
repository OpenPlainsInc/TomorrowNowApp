/*
 * Filename: admin.js
 * Project: TomorrowNow
 * File Created: Tuesday May 31st 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Wed Jun 01 2022
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
import React, {useState} from "react"

const BASE_API = 'http://localhost:8005'


/**
 * Log user in using their credentials
 * @param {String} username 
 * @param {String} userPassword 
 */
export const login = async({username, password}) => {
    
    try {
        let data = {username, password}
        console.log("Attempting Login", username, password)
        let url = new URL(`${BASE_API}/accounts/login/`)
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                // 'Authorization': `Basic ${btoa(username + ":" + password)}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })



        let res = await response
        if (res.status === 202) {
            return {redirect: true}
        }
        
        if (res.status === 400) {
            let json = res.json()
            return json
        }
    }
    catch (e) {
        console.log(e)
        return e
        // {"non_field_errors":["Access denied: wrong username or password."]}
    }
}

const authContext = React.createContext();

export const useAuth = () => {
    const [authed, setAuthed] = React.useState(false);

    return {
        authed,
        login() {
          return new Promise((res) => {
            setAuthed(true);
            res();
          });
        },
        logout() {
          return new Promise((res) => {
            setAuthed(false);
            res();
          });
        },
    };
    
}