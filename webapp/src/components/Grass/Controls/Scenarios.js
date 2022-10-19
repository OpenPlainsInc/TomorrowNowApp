/*
 * Filename: Scenarios.js
 * Project: TomorrowNow
 * File Created: Tuesday October 18th 2022
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
import './scenarios-controls.scss'
import React, { useContext, useEffect, useState, useRef, createElement } from "react";
import Control from "ol/control/Control"
import { FullScreen } from "ol/control";
import MapContext from "../../OpenLayers/MapContext";
const ScenarioControls = ({ children }) => {
    const { map } = useContext(MapContext);
    console.log(map)
    return (
        React.Children.map(children, child => {
            if (React.isValidElement(child)) {
                return React.cloneElement(child, {
                    // 'chartType' : value, data, colorMap
                })
            }
            return child
        })
    )
};
export default ScenarioControls

class ScenarioControler extends Control {
    
    /**
     * @param {Object} [options] Control Options 
     */
    constructor(options) {
        options = options ? options : {};

        const button = document.createElement('button');
        button.innerHTML = 'N';
    
        const element = document.createElement('div');
        element.className = 'rotate-north ol-unselectable ol-control';
        element.appendChild(button);
        // const button = createElement('button', {}, 'N')
        // const element = createElement(
        //     'div',
        //     { className: 'rotate-north ol-unselectable ol-control' },
        //     null,
        //     button
        //   );

        super({
            element: element,
            render: options.render,
        });

        button.addEventListener('click', this.handleRotateNorth.bind(this), false);

    }

    handleRotateNorth() {
        this.getMap().getView().setRotation(0);
    }
}

// import React, { useContext, useEffect, useState } from "react";

export const ScenarioControl = () => {
  const { map } = useContext(MapContext);
  useEffect(() => {
    if (!map) return;
    let scenarioControl = new ScenarioControler({});
    map.controls.push(scenarioControl);
    
    return () => map.controls.remove(scenarioControl);
  }, [map]);
  return null;
};
// export default FullScreenControl;