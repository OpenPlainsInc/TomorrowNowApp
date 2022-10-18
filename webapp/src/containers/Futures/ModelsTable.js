/*
 * Filename: ModelsTable.js
 * Project: TomorrowNow
 * File Created: Wednesday September 21st 2022
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
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';

const TableActionsButtonGroup = ({modelId}) => {
    let navigate = useNavigate();

    const startModel = (e, modelId) => {
        e.preventDefault()
        return navigate(`/futures/${modelId}/scenarios`, {replace: true})
    }

    return (
        <DropdownButton as={ButtonGroup} variant="dark" className="mb-2" title="Actions" id="bg-nested-dropdown">
            <Dropdown.Item eventKey="1" onClick={(e)=>startModel(e, modelId)}>Start</Dropdown.Item>
            <Dropdown.Item eventKey="2">Edit</Dropdown.Item>
            <Dropdown.Item eventKey="3">Delete</Dropdown.Item>
        </DropdownButton> 
    )
    
}

const ModelsTable = ({data}) => {
    console.log(data)
    return (
        <Table striped>
            <thead>
                <tr>
                <th>#</th>
                <th>Model Name</th>
                <th># Scenarios</th>
                <th>Goals</th>
                <th>Status</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                { data ?
                    data.map((r, idx) => {
                        return (
                            <tr key={r.properties.id + idx}>
                                <td>{r.properties.id}</td>
                                <td>{r.properties.name}</td>
                                <td>{r.properties.scenarios}</td>
                                <td>
                                    {
                                        r.properties.goals.map((goal, idx) => {
                                            return (
                                                <div key={goal}>
                                                    <Badge bg="primary">{goal}</Badge>{' '} 
                                                </div>
                                            )
                                        })
                                    }
                                </td>
                                <td>{r.properties.status}</td>
                                <td>
                                    <TableActionsButtonGroup modelId={r.properties.id}/>
                                </td>
                            </tr>
                        )
                    }) : null
                }
            </tbody>
        </Table>
);
}

export default ModelsTable