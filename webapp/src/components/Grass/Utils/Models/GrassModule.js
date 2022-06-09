/*
 * Filename: GrassModule.js
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

import { InputParameter } from "./InputParameter";
import { OutputParameter } from "./OutputParameter";
import { StdoutParser } from "./StdoutParser";

/**
 * @description The definition of a single GRASS GIS module and its inputs, outputs and flags. This module will be run in a location/mapset environment and is part of a process chain. The stdout and stderr output of modules that were run before this module in the process chain can be used as stdin for this module. The stdout of a module can be automatically transformed in list, table or key/value JSON representations in the HTTP response.
 * @param {String} id A unique id to identify …stdin in other modules.
 * @param {String} module The name of the GRASS GIS module (r.univar, r.slope.aspect, v.select, ...) that should be executed. Use as module names \"importer\" or \"exporter\" to import or export raster layer, vector layer or other file based data without calling a GRASS GIS module.
 * @param {Array.<InputParameter>} [inputs = []] A list of input parameters of a GRASS GIS module.
 * @param {Array.<OutputParameter>} [outputs = []] A list of output parameters of a GRASS GIS module.
 * @param {String} [flags = undefined] The flags that should be set for the GRASS GIS module.
 * @param {String} [stdin = undefined] Use the stdout output of a GRASS GIS module or executable of the process chain as input for this module. Refer to the module/executable output as *id::stderr* or *id::stdout*, the \"id\" is the unique identifier of a GRASS GIS module definition.
 * @param {StdoutParser} [stdout = undefined]
 * @param {Boolean} [overwrite = false] Set True to overwrite existing data.
 * @param {Boolean} [verbose = false] Set True to activate verbosity output of the module.
 * @param {Boolean} [superquiet = false] Set True to silence the output of the module.
 * @param {Boolean} [interface_description = false] Set True to print interface description and exit.
 */
export class GrassModule {
    constructor({id, module, inputs=[], outputs=[], flags=undefined, stdin=undefined, stdout=undefined, overwrite=false, verbose=false, superquiet=false, interface_description=false}) {
        this.id = id;
        this.module = module;
        this.inputs = inputs.map(i => new InputParameter({...i}));
        this.outputs = outputs.map(o => new OutputParameter({...o}));
        this.flags = flags;
        this.stdin = stdin;
        this.stdout = stdout ? new StdoutParser({...stdout}) : undefined;
        this.overwrite = overwrite;
        this.verbose = verbose;
        this.superquiet = superquiet;
        this.interface_description = interface_description;
    }
}