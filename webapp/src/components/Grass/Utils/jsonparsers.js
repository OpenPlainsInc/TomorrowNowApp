/*
 * Filename: jsonparsers.js
 * Project: TomorrowNow
 * File Created: Tuesday May 24th 2022
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
 * Groups object data by key
 * @param {Array<Object>} data - Data that needs to be grouped
 * @param {String} key - The object key value to group by
 * @returns {Object} - The grouped data.
 */
export const groupBy = function(data, key) { // `data` is an array of objects, `key` is the key (or property accessor) to group by
    // reduce runs this anonymous function on each element of `data` (the `item` parameter,
    // returning the `storage` parameter at the end
    return data.reduce(function(storage, item) {
      // get the first instance of the key by which we're grouping
      var group = item[key];
      
      // set `storage` for this instance of group to the outer scope (if not empty) or initialize it
      storage[group] = storage[group] || []
      
      // add this item to its group within `storage`
      storage[group].push(item);
      
      // return the updated storage to the reduce function, which will then loop through the next 
      return storage; 
    }, {}); // {} is the initial value of the storage
  };

 /**
  * Method to parser stdout return by GRASS
  * @param {String} sep - Delimiter seperating columns 
  * @returns {Object}
  */
export const parserProjection = (data, sep='|') => {
  let newVal = data.replace(/"|\n/g, '').toString()
  return newVal
}