/*
 * Filename: LearnAboutModelCard.js
 * Project: TomorrowNow
 * File Created: Wednesday September 21st 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Wed Feb 22 2023
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
import Button from 'react-bootstrap/Button';

const LearnAboutModelCard = () => {
    const CGA_FUTURES_RUL = "https://cnr.ncsu.edu/geospatial/research/futures/"
    return (
        <Card>
            <Card.Header as="h2">FUTURES</Card.Header>
            <Card.Body>
                <Card.Title>What is FUTURES?</Card.Title>
                <Card.Text>
                    FUTURES is the <strong>FUTure Urban-Regional Environment Simulation</strong> and 
                    was developed by the Landscape Dynamics Group led by Director 
                    Ross Meentemeyer at the Center for Geospatial Analytics at
                     North Carolina State University. The simulation was designed 
                     specifically to address the <strong>regional-scale</strong> ecological and 
                     environmental impacts of <strong>urbanization</strong> and is one of the few 
                     land change models developed to explicitly capture the <strong>spatial 
                     structure</strong> of development.
                </Card.Text>
                <Button variant="secondary" href={CGA_FUTURES_RUL} target="_blank">Learn More</Button>
            </Card.Body>
        </Card>
    )
}

export default LearnAboutModelCard