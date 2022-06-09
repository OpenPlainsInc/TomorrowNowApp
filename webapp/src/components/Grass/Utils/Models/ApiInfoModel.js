/*
 * Filename: ApiInfoModel.js
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
 * @class
 * @description Response schema that contains API information of the called endpoint.
 * @param {String} endpoint The endpoint of the API call
 * @param {String} method The HTTP method of the request
 * @param {String} path The path of the REST API call
 * @param {String} request_url The request URL
 * @param {String} [post_url = undefined] The post URL
 */
export class ApiInfoModel {
    constructor({endpoint, method, path, request_url, post_url=undefined}) {
        this.endpoint = endpoint;
        this.method = method;
        this.path = path;
        this.request_url = request_url;
        this.post_url = post_url;
    }
}