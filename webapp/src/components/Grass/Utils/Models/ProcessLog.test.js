/*
 * Filename: ProcessLog.test.js
 * Project: TomorrowNow
 * File Created: Friday May 27th 2022
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


import {ProcessLog} from "./ProcessLog"

describe("ProcessLog", ()=> {

    const mockData = new ProcessLog({
        "id": 1,
        "executable": "g.list",
        "parameter": [
            "type=raster",
            "mapset=PERMANENT"
        ],
        "return_code": 200,
        "run_time": 0.05,
        "stderr": [""],
        "stdout": "aspect\nbasin_50k\n"
    })

    test("Create an instance of ProcessLog", ()=> {
        expect(mockData instanceof ProcessLog).toBeTruthy()
    }) 

    test("Confirm arrays are properly unpacked", ()=> {
        expect(mockData.parameter).toHaveLength(2);
        expect(mockData.parameter).toContain('mapset=PERMANENT')
        expect(mockData.stderr).toHaveLength(1);
    })

    test("Confirm default null values are set", ()=> {
        expect(mockData.mapsetSize).toBeNull();
    })

    describe("Method parseStdout", ()=> {
        test("stdout is parsed when delimitar is a space", ()=> {
           let parsedOutput =  mockData.parserStdout("\n")
           expect(parsedOutput).toBe({})
        })
    })

})