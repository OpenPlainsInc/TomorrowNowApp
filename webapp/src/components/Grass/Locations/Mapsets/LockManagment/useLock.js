/*
 * Filename: useLock.js
 * Project: TomorrowNow
 * File Created: Thursday October 20th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Mon Oct 24 2022
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
import React, { useEffect, useState } from "react"
// import Grass from "../grass"
import grass from "@openplains/grass-js-client";

import { useDataSource } from "../../../Utils";

export const useLock = ({locationName, mapsetName}) => {
    const {data, errors, isLoading} = useDataSource({
        getDataFunc: grass.routes.Mapsets.getLock,
        params: [locationName, mapsetName]
    })

    const [isLocked, setIsLocked] = useState(null)

    const removeLock = async () => {
        let res = await grass.routes.Mapsets.deleteLock(locationName, mapsetName)
        console.log(res)
        if (res.status === 'finished' && res.httpCode === 200) {
            setIsLocked("Mapset lock state: False")
        }
        return res
    }

    useEffect(()=> {
        setIsLocked(data)
    },[locationName, mapsetName, data])


    return {isLocked, errors, isLoading, removeLock}
}