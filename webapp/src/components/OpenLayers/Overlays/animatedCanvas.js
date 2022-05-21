/*
 * Filename: animatedCanvas.js
 * Project: TomorrowNow
 * File Created: Friday May 20th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Fri May 20 2022
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

import Rain  from "ol-ext/particule/Rain"
import Cloud from "ol-ext/particule/Cloud"
import Base from "ol-ext/particule/Base"
import { Overlay } from "./Overlay"
import {toContext} from 'ol/render';

import { useEffect, useState } from "react"
// These are are example animation classes that are part of the ol-ext

const clouds = {
    particule: Cloud,
    density: 2,
    angle: Math.PI/3,
    speed: 2,
    className: 'ol-animated-overlay-clouds'
  }

const rain = {
    particule: Rain,
    density: 1,
    angle: 2 * Math.PI / 5,
    speed: 5,
    className: 'ol-animated-overlay-rain'
}

const animatedCanvas = {
        clouds,
        rain
}

const AnimatedCanvas = ({className, density=0.5, speed=4, angle, animate, fps=25, particule}) => {
    const [listener, setListener] = useState([])
    const [time, setTime] = useState(0)
    const [particuleClass, setParticuleClass] = useState(particule || Base)
    const [tmpFps, setTmpFps] = useState(1000 / fps )

    const createParticule = (overlay, coordinate) => {
        return new particuleClass({
            overlay,
            coordinate
        })
    }

    const setAnimation = (overlay, anim) => {
        anim = (anim!==false);
        overlay.set('animation', anim);
        if (anim) {
            overlay._pause = true;
          requestAnimationFrame(overlay._animate.bind(overlay));
        } else {
            overlay.dispatchEvent({ type:'animation:stop', time: overlay._time });
        }
      };

    useEffect(() => {
        const canvas = document.createElement('canvas');
        canvas.className = ((className || '') + ' ol-animated-overlay').trim()
        const ctx = canvas.getContext('2d')
        const overlay = Overlay({
            element: canvas,
            stopEvent: false
        })
        overlay.set('context', ctx);
        const p = createParticule(overlay)
        overlay.size = p.get('size') || [50,50]
        overlay.set('density', density);
        overlay.set('speed', speed);
        overlay.set('angle', typeof(angle) === 'number' ? angle : Math.PI / 4);

        if (animate !== false) setAnimation(overlay, true);
    })
}

export {animatedCanvas}
