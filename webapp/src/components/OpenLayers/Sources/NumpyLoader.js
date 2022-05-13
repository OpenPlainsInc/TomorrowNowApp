/*
 * Filename: NumpyLoader.js
 * Project: TomorrowNow
 * File Created: Wednesday May 11th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Wed May 11 2022
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

// (function (global, factory) {
//     typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
//     typeof define === 'function' && define.amd ? define(['exports'], factory) :
//     (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.NumpyLoader = {}));
//   }(this, (function (exports) { 'use strict';
  
    /* Copyright 2021 Planet Labs Inc.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *     http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
  
    /** Client-side parser for .npy files
     *
     *  The numpy format specification is [here](http://docs.scipy.org/doc/numpy-dev/neps/npy-format.html).
     *  This code is inspired by the GIST found [here](https://gist.github.com/nvictus/88b3b5bfe587d32ac1ab519fd0009607) but has been heavily modified.
     *
     * @module NumpyLoader
     */
  
    function asciiDecode(buf) {
      return String.fromCharCode.apply(null, new Uint8Array(buf));
    }
  
    function readUint16LE(buffer) {
      const view = new DataView(buffer);
      let val = view.getUint8(0);
      val |= view.getUint8(1) << 8;
      return val;
    }
  
    /** Sniff test to see if an arrayBuffer contains a Numpy arr
     *
     * @param {ArrayBuffer} buf - The array buffer to test.
     *
     * @returns {boolean} Returns true if likely a numpy array, false otherwise.
     */
    function isNumpyArr(buf) {
      const magic = asciiDecode(buf.slice(0, 6));
      return magic.slice(1, 6) === 'NUMPY';
    }
  
    /** Read an ArrayBuffer as a NumpyTile
     *
     *  @param {ArrayBuffer} buf - Numpy array to convert to Javascript typed array.
     *
     *  @returns Javascript typed array.
     */
    function fromArrayBuffer(buf) {
      if (buf.byteLength === 0) {
        return {};
      }
      // Check the magic number
  
      if (!isNumpyArr(buf)) {
        throw new Error('Not a NumpyTile');
      }
  
      const headerLength = readUint16LE(buf.slice(8, 10)),
        headerStr = asciiDecode(buf.slice(10, 10 + headerLength)),
        offsetBytes = 10 + headerLength;
  
      // this is a rough but working conversion of the
      //  numpy header dict to Javascript object.
      const info = JSON.parse(
        headerStr
          .toLowerCase()
          .replace(/'/g, '"')
          .replace(/\(/g, '[')
          .replace(/\),/g, ']')
      );
  
      // Intepret the bytes according to the specified dtype
      let data;
      if (info.descr === '|u1') {
        data = new Uint8Array(buf, offsetBytes);
      } else if (info.descr === '|i1') {
        data = new Int8Array(buf, offsetBytes);
      } else if (info.descr === '<u2') {
        data = new Uint16Array(buf, offsetBytes);
      } else if (info.descr === '<i2') {
        data = new Int16Array(buf, offsetBytes);
      } else if (info.descr === '<u4') {
        data = new Uint32Array(buf, offsetBytes);
      } else if (info.descr === '<i4') {
        data = new Int32Array(buf, offsetBytes);
      } else if (info.descr === '<f4') {
        data = new Float32Array(buf, offsetBytes);
      } else if (info.descr === '<f8') {
        data = new Float64Array(buf, offsetBytes);
      } else {
        throw new Error('unknown numeric dtype');
      }
      return {
        shape: info.shape,
        data: data,
      };
    }
  
    exports.fromArrayBuffer = fromArrayBuffer;
    exports.isNumpyArr = isNumpyArr;
  
    // Object.defineProperty(exports, '__esModule', { value: true });
  
//   })));
