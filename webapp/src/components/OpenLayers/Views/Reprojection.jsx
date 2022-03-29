/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/OpenLayers/Views/Reprojection.jsx
 * Project: TomorrowNow
 * File Created: Tuesday March 22nd 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Tu/03/yyyy 11:nn:04
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

// https://openlayers.org/en/latest/examples/reprojection-by-code.html
import React, { useState, useContext, useEffect } from 'react';
import MapContext from "../MapContext";

import {View} from "ol";
import {get as getProjection, getTransform} from 'ol/proj';
import {register} from 'ol/proj/proj4';
import {applyTransform} from 'ol/extent';
import proj4 from 'proj4';

const Reprojection = ({epsg}) => {
    const { map } = useContext(MapContext);
    const [code, setCode] = useState('6542');  // 4326 //EPSG:3857 
    const [name, setName] = useState(null);
    const [proj4def, setProj4def] = useState(null);
    const [bbox, setBbox] = useState(null);
    const [extent, setExtent] = useState(null)
    const [newView, setNewView] = useState(null);


    useEffect(()=>{
        fetch('https://epsg.io/?format=json&q=' + epsg)
          .then(function (response) {
            return response.json();
          })
          .then(function (json) {
            const results = json['results'];
            if (results && results.length > 0) {
              for (let i = 0, ii = results.length; i < ii; i++) {
                const result = results[i];
                if (result) {
                  const _code = result['code'];
                  setCode(code)
                  const _name = result['name'];
                  setName(_name)
                  const _proj4def = result['proj4'];
                  setProj4def(_proj4def)
                  const _bbox = result['bbox'];
                  setBbox(_bbox)
                  if (
                    _code &&
                    _code.length > 0 &&
                    _proj4def &&
                    _proj4def.length > 0 &&
                    _bbox &&
                    _bbox.length === 4
                  ) {
                    // setProjection(code, name, proj4def, bbox);
                    return;
                  }
                }
              }
            }
            return null
            // return setProjection(null, null, null, null);
          });

    },[epsg])


    useEffect(()=>{
        if (!map) return;
        
          console.log(`(${code}) ${name}`)
      
          const newProjCode = 'EPSG:' + code;
          proj4.defs(newProjCode, proj4def);
          register(proj4);
          const newProj = getProjection(newProjCode);
          const fromLonLat = getTransform('EPSG:4326', newProj);
        
          let worldExtent = [bbox[1], bbox[2], bbox[3], bbox[0]];
          newProj.setWorldExtent(worldExtent);
        
          // approximate calculation of projection extent,
          // checking if the world extent crosses the dateline
          if (bbox[1] > bbox[3]) {
            worldExtent = [bbox[1], bbox[2], bbox[3] + 360, bbox[0]];
          }
          const _extent = applyTransform(worldExtent, fromLonLat, undefined, 8);
          newProj.setExtent(_extent);
          setExtent(_extent)
          const _newView = new View({
            projection: newProj,
          });
          setNewView(_newView)
          
    },[bbox])
    
    useEffect(()=>{
      if (map && extent && newView) {
        console.log(`Reprojecting: ${newView}`)
        console.log(`New Extent: ${extent}`)

        map.setView(newView);
        newView.fit(extent);
      }

    },[map, extent, newView])

    return null
  }



export default Reprojection