/*
 * Filename: LayerCountCard.js
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


import { useEffect, useState } from 'react';
import { AnalyticSummaryCard } from '../../Utils/AnalyticSummaryCard';


export const MapsetsCountCard = ({layerCount, layerType}) => {
    const LAYER_TYPES = {
        'vector': {
            icon: 'fa-vector-square',
            tooltip: 'The total number of vectors in the mapset.'
        }, 
        'raster': {
            icon: 'fa-border-all',
            tooltip: 'The total number of rasters in the mapset.'
        }
    }

    const layerIcon = (layerType) => {
        if (Object(LAYER_TYPES).keys().contains(layerType)) {
            return LAYER_TYPES[layerType].icon
        }
    }

    const layerTooltip = (layerType) => {
        if (Object(LAYER_TYPES).keys().contains(layerType)) {
            return LAYER_TYPES[layerType].icon
        }
    }

    const [icon, setIcon] = useState(layerIcon(layerType))
    const [tooltip, setTooltip] = useState(layerTooltip(layerType))

    // useEffect(()=> {
    //     setIcon(layerIcon(layerType))
    //     setTooltip(layerTooltip(layerType))
    // }, [layerType])



    return(
        <AnalyticSummaryCard
            label="Mapsets"
            value={layerCount}
            icon={icon}
            tooltip={tooltip}
        />
    )
}