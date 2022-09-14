/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/OpenLayers/Views/Reprojection.jsx
 * Project: TomorrowNow
 * File Created: Tuesday March 22nd 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Th/09/2022 10:nn:46
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
    const [projectionDetails, setProjectionDetails] = useState(null)
    const [code, setCode] = useState(null);  // 4326 //EPSG:3857 
    const [name, setName] = useState(null);
    const [proj4def, setProj4def] = useState(null);
    const [bbox, setBbox] = useState(null);
    const [extent, setExtent] = useState(null)
    const [newView, setNewView] = useState(null);

    useEffect(()=> {
      //Do nothing on first mount
    },[])

    useEffect(() => {
      let isMounted = true; 
      async function fetchEpsg(epsgCode) {
          try {
              let projDetails = {}
              let url = new URL(`https://epsg.io/?format=json&q=${epsgCode}`)

              const res = await fetch(url, {method: "GET"});
              const data = await res.json();
              console.log("epsg.io response:", data)
              const results = data.results
              console.log("results", results)
              if (results && results.length > 0) {
                for (let i = 0, ii = results.length; i < ii; i++) {
                  const result = results[i];
                  if (result) {
                    const _code = result['code'];
                    const _name = result['name'];
                    const _proj4def = result['proj4'];
                    const _bbox = result['bbox'];

                    if (_code && _code.length > 0 &&
                        _proj4def && _proj4def.length > 0 &&
                        _bbox &&_bbox.length === 4
                    ) {
                      let projDetails = {
                        code: _code,
                        name: _name,
                        proj4def: _proj4def,
                        bbox: _bbox
                      }
                      // setCode(_code)
                      // setName(_name)
                      // setProj4def(_proj4def)
                      // setBbox(_bbox)
                      setProjectionDetails(projDetails)
                    }

                  }

                }
              }
            

              if (isMounted) setProjectionDetails(projDetails)
            } catch (e) {
              console.log(e);
          }
          return () => { isMounted = false }
      }
      fetchEpsg(epsg)
    }, [epsg])


    useEffect(()=>{
        if (!map || !projectionDetails|| !projectionDetails.bbox || !projectionDetails.proj4def || !projectionDetails.code) return;
          let currentViewProjection = map.getView().getProjection()
          console.log("Current Map View Projection:", currentViewProjection.getCode())
          let code = projectionDetails.code;
          let bbox = projectionDetails.bbox;
          let name = projectionDetails.name;
          let proj4def = projectionDetails.proj4def;
          console.log(`(${code}) ${name}`)
          console.log(map, bbox, code, name, proj4def)

      
          const newProjCode = 'EPSG:' + code;
          proj4.defs(newProjCode, proj4def);
          register(proj4);
          const newProj = getProjection(newProjCode);
          console.log("newProj", newProj)
          const fromLonLat = getTransform('EPSG:4326', newProj);
          // const fromLonLat = getTransform(currentViewProjection.getCode(), newProj);

          console.log("fromLonLat", fromLonLat)

          let worldExtent = [bbox[1], bbox[2], bbox[3], bbox[0]];
          console.log("World Extent", worldExtent)
          newProj.setWorldExtent(worldExtent);
        
          // approximate calculation of projection extent,
          // checking if the world extent crosses the dateline
          if (bbox[1] > bbox[3]) {
            worldExtent = [bbox[1], bbox[2], bbox[3] + 360, bbox[0]];
          }
          const _extent = applyTransform(worldExtent, fromLonLat, undefined, 8);
          console.log("Transformed World Extent", worldExtent)

          newProj.setExtent(_extent);
          setExtent(_extent)
          const _newView = new View({
            projection: newProj,
          });
          setNewView(_newView)
          
    },[map, projectionDetails])

    return (<div>{name}</div>)
  }



export default Reprojection