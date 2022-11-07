/*
 * Filename: ImageLayer.js
 * Project: TomorrowNow
 * File Created: Saturday November 5th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Sat Nov 05 2022
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

import React, { useContext, useEffect, useState } from "react";
import MapContext from "../MapContext";
import OLImage from 'ol/layer/Image';

export const ImageLayer = ({source, layerName, zindex=1, ...props}) => {
    const { map } = useContext(MapContext);
    const [layer, setLayer] = useState(null)

    useEffect(() => {
      if (!map) return;
      let imageLayer = new OLImage({
        ...props,
        source
      });
      imageLayer.setZIndex(zindex);
      map.addLayer(imageLayer);
      imageLayer.set('name', layerName)
      setLayer(imageLayer)
     
    
      return () => { 
        if (map) {
          map.removeLayer(imageLayer);
          setLayer(null)
        }
      };
    }, [map, source]);
  
    return null;

}
