/*
 * Filename: ProgressInfoModel.js
 * Project: TomorrowNow
 * File Created: Wednesday May 25th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Thu Jun 09 2022
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
 * This class defines the model for progress information.
 */
export class ProgressInfoModel {
    /**
     * Create a ProgressInfoModel
     * @param {Number} step - The current processing step.
     * @param {Number} num_of_steps - The total number of processing steps.
     * @param {Number} sub_step - The current sub step of …current processing step.
     * @param {Number} num_of_sub_steps - The total number of sub …current processing step.
     */
    constructor({step, num_of_steps, sub_step = 0, num_of_sub_steps = 0}) {
        this.step = step;
        this.num_of_steps = num_of_steps;
        this.sub_step = sub_step;
        this.num_of_sub_steps = num_of_sub_steps;
    }
}

