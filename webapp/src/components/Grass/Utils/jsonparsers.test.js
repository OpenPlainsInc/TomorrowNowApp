/*
 * Filename: jsonparsers.test.js
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

import { groupBy } from "./jsonparsers"

describe("jsonparsers", ()=> {

    describe('groupBy', ()=> {
        const mockData = [
            {"a": 1, "b": 2, "c": 3},
            {"a": 1, "b": 20, "c": 30},
            {"a": 4, "b": 5, "c": 6}
        ]

        test("group groups key values data by key", ()=> {
            const expectedResult = {
                "1": [
                    {"a": 1, "b": 2, "c": 3},
                    {"a": 1, "b": 20, "c": 30}
                ], 
                "4": [
                    {"a": 4, "b": 5, "c": 6}
                ]
            }
            const groupedData = groupBy(mockData, "a")
            // Check that the data properly transformed
            expect(groupedData).toMatchObject(expectedResult)
            // Check that the original object didn't mutate
            expect(mockData.length).toBe(3)
        }) 
    })
})
