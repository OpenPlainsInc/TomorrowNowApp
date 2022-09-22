/*
 * Filename: ModelsTable.js
 * Project: TomorrowNow
 * File Created: Wednesday September 21st 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Wed Sep 21 2022
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
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const TableActionsButtonGroup = () => {
    return (
        <DropdownButton as={ButtonGroup} variant="dark" className="mb-2" title="Actions" id="bg-nested-dropdown">
            <Dropdown.Item eventKey="1">Start</Dropdown.Item>
            <Dropdown.Item eventKey="2">Edit</Dropdown.Item>
            <Dropdown.Item eventKey="2">Delete</Dropdown.Item>
        </DropdownButton> 
    )
    
}

const ModelsTable = () => {
    return (
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Model Name</th>
              <th># Scenarios Run</th>
              <th>Goals</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>North Carolina Research Triangle</td>
              <td>103</td>
              <td>
                <Badge bg="primary">Protect Natural Reasources</Badge>{' '} 
                <Badge bg="primary">Limit Landscape Fragmentation</Badge>
              </td>
              <td>Ready</td>
              <td>
                <TableActionsButtonGroup/>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Dallas–Fort Worth–Arlington</td>
              <td>234</td>
              <td>
                <Badge bg="primary">Reduce Flooding Over Roads</Badge>{' '} 
                <Badge bg="primary">Reduce Property Damage from Flooding</Badge>
              </td>
              <td>Ready</td>
              <td>
                <TableActionsButtonGroup/>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>Denver, CO</td>
              <td>0</td>
              <td>
                <Badge bg="primary">Protect Water Quality</Badge>
              </td>
              <td>Initializing</td>
              <td>
                <TableActionsButtonGroup/>
              </td>
            </tr>
          </tbody>
        </Table>
      );
}

export default ModelsTable