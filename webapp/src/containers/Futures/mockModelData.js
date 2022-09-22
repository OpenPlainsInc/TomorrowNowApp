/*
 * Filename: mockModelData.js
 * Project: TomorrowNow
 * File Created: Thursday September 22nd 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Thu Sep 22 2022
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


const mockModelData = () => {
    const data = {
        "type": "FeatureCollection",
        'crs': {
            'type': 'name',
            'properties': {
              'name': 'EPSG:4326',
            },
        },
        "features": [
          {
            "type": "Feature",
            "properties": {
                "id": 1,
                "name": "North Carolina Research Triangle",
                "scenarios": 103,
                "goals": ["Protect Natural Reasources", "Limit Landscape Fragmentation"],
                "status": "Active",
                "counties": [
                    {
                        "statefp": "37",
                        "countyfp": "183",
                        "name": "Wake",
                        "geoid": "37183"
                    },
                    {
                        "statefp": "37",
                        "countyfp": "063",
                        "name": "Durham",
                        "geoid": "37063"
                    },
                    {
                        "statefp": "37",
                        "countyfp": "135",
                        "name": "Orange",
                        "geoid": "37135"
                    }
                ]
            },
            "geometry": {
              "type": "Point",
              "coordinates": [
                -78.760986328125,
                35.8356283888737
              ]
            }
          },
          {
            "type": "Feature",
            "properties": {
                "id": 2,
                "name": "Dallas–Fort Worth–Arlington",
                "scenarios": 234,
                "goals": ["Reduce Flooding Over Roads", "Reduce Property Damage from Flooding"],
                "status": "Active",
                "counties": [
                    {
                        "statefp": "48",
                        "countyfp": "439",
                        "name": "Tarrant",
                        "geoid": "48439"
                    },
                    {
                        "statefp": "48",
                        "countyfp": "113",
                        "name": "Dallas",
                        "geoid": "48113"
                    },
                    {
                        "statefp": "48",
                        "countyfp": "085",
                        "name": "Collin",
                        "geoid": "48085"
                    },
                    {
                        "statefp": "48",
                        "countyfp": "121",
                        "name": "Denton",
                        "geoid": "48121"
                    }
                ]
            },
            "geometry": {
              "type": "Point",
              "coordinates": [
                -97.03674316406249,
                32.76418137510082
              ]
            }
          },
          {
            "type": "Feature",
            "properties": {
                "id": 3,
                "name": "Denver, CO",
                "scenarios": 0,
                "goals": ["Protect Water Quality"],
                "status": "Initiating",
                "counties": [
                    {
                        "statefp": "08",
                        "countyfp": "031",
                        "name": "Denver",
                        "geoid": "08031"
                    },
                    {
                        "statefp": "08",
                        "countyfp": "059",
                        "name": "Jefferson",
                        "geoid": "08059"
                    },
                    {
                        "statefp": "08",
                        "countyfp": "035",
                        "name": "Douglas",
                        "geoid": "08035"
                    },
                    {
                        "statefp": "08",
                        "countyfp": "013",
                        "name": "Boulder",
                        "geoid": "08013"
                    }
                ]
            },
            "geometry": {
              "type": "Point",
              "coordinates": [
                -104.9853515625,
                39.757879992021756
              ]
            }
          }
        ]
      }

      return data;
}

export default mockModelData;