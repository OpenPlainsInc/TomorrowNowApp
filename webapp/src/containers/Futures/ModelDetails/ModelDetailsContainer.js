/*
 * Filename: ModelDetailsContainer.js
 * Project: TomorrowNow
 * File Created: Wednesday October 19th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Wed Nov 30 2022
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
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';

import Collection from 'ol/Collection'
import Tab from 'react-bootstrap/Tab';
import { useLocation, Outlet, useParams } from "react-router-dom";
import { useModel } from '../useModel'

export default function ModelDetailsContainer({ children }) {
    let {modelId} = useParams();
    // console.log(location, modelId)
    // const {lastJsonMessage} = useActiniaAsyncProcess({resourceId, status})

    let {data, errors, isloading} = useModel({modelId})
    console.log(data, errors, isloading)
    return (
        <Container fluid className="bg-light text-dark" style={{paddingTop: 20, height: '100vh'}}>
            <div>
                {
                    React.Children.map(children, child => {
                        if (React.isValidElement(child)) {
                            return React.cloneElement(child, {'model' : data, errors, isloading})
                        }
                        return child
                    })
                }
            </div>
        </Container>
    )
}