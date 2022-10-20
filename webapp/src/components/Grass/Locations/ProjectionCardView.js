/*
 * Filename: ProjectionCardView.js
 * Project: TomorrowNow
 * File Created: Thursday October 20th 2022
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
import Card from 'react-bootstrap/Card'
import { useEffect, useState } from 'react'
// import { parserProjection } from "../Utils/jsonparsers"

export const ProjectionCardView = ({projection}) => {

    const epsgRegex = (projectionString) => {
        if (!projectionString) return;
        let regex = /EPSG,\d{4,}/g
        let found = projectionString.match(regex)
        let epsgs = found.map(e => e.replace(',', ':'))
        const [epsg] = epsgs.slice(-1) // The project 
        return [epsg]
    }

    const crsRegx = (projectionString) => {
        if (!projectionString) return;
        let regex = /PROJCRS\[[aA1-zZ9(|)| /]{1,}/g
        let found = projectionString.match(regex)
        let _crs = Array.isArray(found) ? found.map(e => e.replace('PROJCRS[', '')) : [];
        const [crs] = Array.isArray(_crs) ? _crs.slice(-1) : [""] // The project 
        return crs
    }

    const [crs, setCrs] = useState("")
    const [epsgs, setEpsgs] = useState(null)
    // // const [epsgs, setEpsgs] = useState([])
    useEffect(()=> {
        if (!projection) return;
        setEpsgs(epsgRegex(projection))
        setCrs(crsRegx(projection))
    }, [projection])

    return (
        <Card>
            <Card.Header>
                <Card.Title>Projection</Card.Title>
            </Card.Header>
            <Card.Body>
                <Card.Subtitle>{crs}</Card.Subtitle>
               <ul>
                    { 
                    epsgs ? epsgs.map((epsg, idx) => {
                        return (
                            <li key={epsg + idx}>{epsg}</li>
                        )
                    }) : <></>
                }
               </ul>
            </Card.Body>
            {/* <Card.Footer>
                <Card.Title>Projection</Card.Title>
            </Card.Footer> */}
        </Card>
    )
}