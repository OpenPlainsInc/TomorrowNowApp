/*
 * Filename: AnalyticSummaryCard.js
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


import Card from 'react-bootstrap/Card';
import { InfoToolTip } from './InfoToolTip';

export const AnalyticSummaryCard = ({label, value, icon, tooltip}) => {

    return(
        <Card style={{  paddingTop: '1rem'}}>
            <Card.Img variant="top" className={`fa-solid ${icon} fa-5x`}/>
            <Card.Body>
            
                <Card.Text variant="h1" style={{"textAlign": "center", "fontSize": "200%"}}>{value}</Card.Text>
                {/* <ModelsTable data={data.features}/> */}
                {/* <Button variant="secondary">Explore</Button> */}
            </Card.Body>
            <Card.Footer>
                <Card.Title>{label}
                    <InfoToolTip desc={tooltip}/>
                </Card.Title>
                {/* <Card.Text><small>Updated 3 minutes ago</small></Card.Text> */}
            </Card.Footer>
        </Card>
    )
}