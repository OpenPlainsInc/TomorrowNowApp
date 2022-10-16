/*
 * Filename: index.js
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


import {useAuth} from "./useAuth"
import {useToken} from "./useToken"
// import { RequireAuth } from "./RequireAuth";
import { AuthProvider } from "./AuthProvider";
import { useAuthContext } from "./useAuthContext";
const auth = {
    useAuth,
    useToken,
    // RequireAuth,
    AuthProvider,
    useAuthContext
}

export default auth;