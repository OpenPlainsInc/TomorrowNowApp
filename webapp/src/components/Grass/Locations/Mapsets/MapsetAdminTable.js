/*
 * Filename: MapsetAdminTable.js
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
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { useRasters } from './Layers/useRasters';
import { useVectors } from './Layers/useVectors';
import { Mapset } from './Mapset';
import {useLock} from '../Mapsets/LockManagment/useLock';
import { useEffect, useState } from 'react';

import Badge from 'react-bootstrap/Badge';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';

const TableActionsButtonGroup = ({modelId}) => {
    let navigate = useNavigate();

    const createLock = (e, modelId) => {
        e.preventDefault()
        return navigate(`/futures/${modelId}/scenarios`, {replace: true})
    }

    const removeLock = (e, modelId) => {
        e.preventDefault()
        return navigate(`/futures/${modelId}`, {replace: true})
    }

    const exploreMapset = (e, modelId) => {
        e.preventDefault()
        return navigate(`/futures/${modelId}/analytics`, {replace: true})
    }

    return (
        <DropdownButton as={ButtonGroup} variant="dark" className="mb-2" title="Actions" id="bg-nested-dropdown">
            <Dropdown.Item eventKey="1" onClick={(e)=>createLock(e, modelId)}>Create Lock</Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={(e)=>removeLock(e, modelId)}>Delete Lock</Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={(e)=>exploreMapset(e, modelId)}>Explore</Dropdown.Item>
            <Dropdown.Item eventKey="3">Delete</Dropdown.Item>
        </DropdownButton> 
    )
    
}

const MapsetAdminTableRow = ({locationName, mapsetName}) => {
    const {rasters} = useRasters({locationName, mapsetName})
    const {vectors} = useVectors({locationName, mapsetName})
    const {isLocked, removeLock} = useLock({locationName, mapsetName})
    const [numRasters, setNumRasters] = useState(0)
    const [numVectors, setNumVectors] = useState(0)
    const [lock, setLock] = useState(null)

    const deleteLock = (e) => {
        e.preventDefault()
        let data = removeLock()
        console.log(data)
    }

    useEffect(()=> {
        if (!rasters) return;
        if (!rasters.processResults) return;
        setNumRasters(rasters.processResults.length)
    }, [rasters])

    useEffect(()=> {
        if (!vectors) return;
        // console.log("vectors", vectors)
        if (!vectors.process_results) return;
        setNumVectors(vectors.process_results.length)
    }, [vectors])

    useEffect(()=> {
        if (!isLocked) return;
        // console.log(isLocked)
        setLock(isLocked.message)
    }, [isLocked])

    return (
        <tr>
            <td>{mapsetName}</td>
            <td>{numRasters}</td>
            <td>{numVectors}</td>
            <td>{lock}</td>
            <td>
                <DropdownButton as={ButtonGroup} variant="primary" className="mb-2" title="Actions" id="bg-nested-dropdown">
                    {/* <Dropdown.Item eventKey="1" onClick={(e)=>createLock(e, modelId)}>Create Lock</Dropdown.Item> */}
                    <Dropdown.Item eventKey="2" onClick={(e)=>deleteLock(e)}>Delete Lock</Dropdown.Item>
                    {/* <Dropdown.Item eventKey="2" onClick={(e)=>exploreMapset(e, modelId)}>Explore</Dropdown.Item> */}
                    {/* <Dropdown.Item eventKey="3">Delete</Dropdown.Item> */}
                </DropdownButton>
            </td>
        </tr>
    )
}

export const MapsetsAdminTable = ({locationName, mapsets}) => {

    return (
        <Card style={{  marginBottom: '1rem'}}>
            <Card.Header>
                <Card.Title>Mapsets</Card.Title>
            </Card.Header>
            <Card.Body>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th># Rasters</th>
                        <th># Vectors</th>
                        <th>Lock</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { mapsets ?
                            mapsets.map(m => {
                                return <MapsetAdminTableRow key={m + ":" + locationName} mapsetName={m} locationName={locationName}/>
                            }) : <></>
                        }
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    )
}

