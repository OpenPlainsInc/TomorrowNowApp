/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/Grass/Locations/Mapsets/Mapset.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Tuesday, April 12th 2022, 4:03:34 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */

import React, {useState} from "react";
import { useRasters } from "./Layers/useRasters";
import { useMapset } from "./useMapset";

export const Mapset = ({locationName, mapsetName}) => {
    const {mapset, errors, isLoading} = useMapset({locationName, mapsetName})
    const { rasters } = useRasters({locationName, mapsetName})
    console.log("mapset:", mapset)
    console.log("rasters:", rasters?.processResults)
    return (
        <div>{`${locationName}: ${mapsetName}`}</div>
    )
}