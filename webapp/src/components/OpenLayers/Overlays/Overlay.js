/*
 * Filename: Overlay.js
 * Project: TomorrowNow
 * File Created: Friday May 20th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Fri May 27 2022
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
import { useContext, useEffect, useState } from "react";
import MapContext from "../MapContext";
import OLOverlay from 'ol/Overlay';
// https://openlayers.org/en/latest/apidoc/module-ol_Overlay-Overlay.html
export const Overlay = ({
    id=undefined,
    element=undefined,
    offset=[0, 0],
    position=undefined,
    positioning='top-left',
    stopEvent=true,
    insertFirst=true,
    autoPan=false,
    autoPanAnimation=undefined,
    autoPanMargin=20,
    autoPanOptions=undefined,
    className='ol-overlay-container ol-selectable'
}) => {

    const { map } = useContext(MapContext); 
    const [olay, setOlay] = useState(null)

    useEffect(() => {
        if (!map) return;
        
        let overlay = new OLOverlay({
            id,
            element,
            offset,
            position,
            positioning,
            stopEvent,
            insertFirst,
            autoPan,
            autoPanAnimation,
            autoPanMargin,
            autoPanOptions,
            className
        })
        map.addOverlay(overlay);
        setOlay(overlay)
        return () => {
          if (map) {
            map.removeOverlay(overlay);
          }
        };
      }, [map]);

      useEffect(()=> {
        if (!olay || !position) return;
        olay.setPosition(position)
      }, [olay, position])

      return null;
}