/*
 * Filename: Model.js
 * Project: TomorrowNow
 * File Created: Tuesday October 18th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Tue Oct 18 2022
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
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ModelMap from './ModelMap';
import { ProtectedArea } from './ProtectedArea';
import Collection from 'ol/Collection'

export default function ModelContainer() {
    
    const devRestrictionsCollection = new Collection()
   
    const [devRestrictions, setDevRestrictions] = useState(devRestrictionsCollection);

    return (
        <Container fluid className="bg-light text-dark">
            <Row>
              <Col md={9}>
                <ModelMap devRestrictions={devRestrictions}></ModelMap>
              </Col>
              <Col md={3}>
                <ProtectedArea devRestrictions={devRestrictions}></ProtectedArea>
              </Col>
            </Row>
        </Container>
    )
}