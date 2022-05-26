/*
 * Filename: LandsatActor.js
 * Project: TomorrowNow
 * File Created: Wednesday May 25th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Wed May 25 2022
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


/**
 * @description The atmospheric correction that should be applied to the landsat scene.
 * @param {String} name The import data format type.
 */
 export class LandsatActor {
    static uncorrected = new LandsatActor('uncorrected');
    static dos1 = new LandsatActor('dos1');
    static dos2 = new LandsatActor('dos2');
    static dos2b = new LandsatActor('dos2b');
    static dos3 = new LandsatActor('dos3');
    static postgis = new LandsatActor('postgis');
    static dos4 = new LandsatActor('dos4');

    constructor(name) {
        this.name = name;
    }

    toString() {
        return `LandsatActor.${this.name}`
    }
}