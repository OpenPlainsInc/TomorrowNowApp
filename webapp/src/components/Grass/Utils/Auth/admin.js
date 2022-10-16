/*
 * Filename: admin.js
 * Project: TomorrowNow
 * File Created: Tuesday May 31st 2022
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

// import { settings } from "../../Settings"

// /**
//  * Log user in using their credentials
//  * @param {String} username 
//  * @param {String} userPassword 
//  */
// export const login = async({username, password}) => {
    
//     try {
//         let data = {username, password}
//         console.log("Attempting Login", username, password)
//         let url = new URL(`${settings.AUTH_BASE_URL}/auth/login/`)
//         let response = await fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Authorization': `Basic ${btoa(username + ":" + password)}`,
//                 'Content-Type': 'application/json'
//             },
//             // body: JSON.stringify(data)
//         })
       
//         let res = await response
//         let json = await res.json()
//         return json
        

//     }
//     catch (e) {
//         console.log(e)
//         return e
//         // {"non_field_errors":["Access denied: wrong username or password."]}
//     }
// }


// /**
//  * Logs user out of current session and navigates back to login view from current view.
//  */
// export const logout = async () => {
//     try {
//         console.log("Attempting Logout")
//         let url = new URL(`${settings.AUTH_BASE_URL}/logout/`)
        
//         let response = await fetch(url, {
//             method: 'POST',
//             // headers: {
//             //     'Authorization': `Basic ${btoa(username + ":" + password)}`,
//             //     'Content-Type': 'application/json'
//             // }
//         })

//         let res = await response
//         if (res.status === 202) {
//             return {auth: true, redirect: true}
//         }
        
//         if (res.status === 400) {
//             let json = res.json()
//             return {...json, auth: false, redirect: false}
//         }
//     }
//     catch (e) {
//         console.log(e)
//         return e
//         // {"non_field_errors":["Access denied: wrong username or password."]}
//     }
// }


// export const isAuthValid = () => {

// }

// function getCookie(name) {
//     let cookieValue = null;

//     if (document.cookie && document.cookie !== '') {
//         const cookies = document.cookie.split(';');
//         for (let i = 0; i < cookies.length; i++) {
//             const cookie = cookies[i].trim();

//             // Does this cookie string begin with the name we want?
//             if (cookie.substring(0, name.length + 1) === (name + '=')) {
//                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));

//                 break;
//             }
//         }
//     }

//     return cookieValue;
// }

// export const useCSRFTtoken = () => {
//     const csrftoken = getCookie('csrftoken');
//     return csrftoken;
// } 

// const admin = {
//     login,
//     logout,
//     isAuthValid
// }

// export default admin;