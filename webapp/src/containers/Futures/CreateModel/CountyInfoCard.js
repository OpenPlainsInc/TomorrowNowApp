/*
 * Filename: CountyInfoCard.js
 * Project: TomorrowNow
 * File Created: Thursday September 22nd 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Thu Sep 22 2022
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


import React, { useEffect, useState, useRef } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


/**
 * 
 * @param {*} param0 
 * @param //name, geoid, aland, awater, countyfp, statefp, layer}
 * @returns 
 */
const CountyInfoCard = ({county, removeCountyHandler=null}) => {

    const convertSqmToSqKm = (sqm) => {
        return (sqm / 1e6).toFixed(2)
    }

    const alandKm2 = convertSqmToSqKm(county.aland)
    const awaterKm2 = convertSqmToSqKm(county.awater)
    return (
        <Card style={{ width: '18rem' }}>
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <Card.Header>
            <Card.Title>{county.name}</Card.Title>
            {/* <Card.Subtitle>{county.geoid}</Card.Subtitle> */}
        </Card.Header>
        <Card.Body>
            
            <Card.Text><strong>Area Land:</strong> {alandKm2} km<sup>2</sup></Card.Text>
            <Card.Text><strong>Area Water:</strong> {awaterKm2} km<sup>2</sup></Card.Text>
            <Card.Text><small>Data Provided from U.S. Cenus: {county.layer} layer</small></Card.Text>
            <Button variant="danger" onClick={(e) => {removeCountyHandler(county.geoid)}}>Remove</Button>
            
        </Card.Body>
        </Card>
    )
}

export default CountyInfoCard