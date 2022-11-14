/*
 * Filename: Model.js
 * Project: TomorrowNow
 * File Created: Tuesday October 18th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Sun Nov 13 2022
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
import {useParams } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ModelMap from './ModelMap';
import { ProtectedArea } from './ProtectedArea';
import Collection from 'ol/Collection'
import { SidePanel } from './SidePanel';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';
import ScenarioForm from './ScenarioForm'
import { useForm, useFormState } from "react-hook-form";
import {useModel} from "../useModel";
export default function ModelContainer() {
    const methods = useForm();
    let {modelId} = useParams();
    const model = useModel({modelId})
    console.log("Model:", model)
    const { isValid, isDirty } = useFormState(methods);
    const devRestrictionsCollection = new Collection()
   
    const [devRestrictions, setDevRestrictions] = useState(devRestrictionsCollection);

    return (
        <Container fluid className="bg-light text-dark">
          <ScenarioForm>
            <Row>
              <Col md={8}>
                <ModelMap devRestrictions={devRestrictions} model={model}></ModelMap>
              </Col>
              <Col md={4}>
                <SidePanel>
                <Tab eventKey="potential" title="Scenarios">
                    <ProtectedArea devRestrictions={devRestrictions}></ProtectedArea>
                </Tab>
                <Tab eventKey="chat" title="Chat">
                    <input type="textarea" placeholder='admin: sup dog?' />
                </Tab>
              
                </SidePanel>
                {
                  isValid || isDirty ? 
                
                  <Row>
                      <div className="d-grid gap-2" >
                          <Button variant="secondary" type="submit" disabled={!isValid && isDirty}>Run Scenario</Button>
                      </div>
                    </Row> : null
                }
              </Col>
            </Row>
            
            </ScenarioForm>
        </Container>
    )
}