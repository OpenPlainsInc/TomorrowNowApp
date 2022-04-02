/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/OpenLayers/Controls/RotateControl.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Thursday, March 31st 2022, 1:12:47 am
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */

// https://openlayers.org/en/latest/apidoc/module-ol_control_Rotate-Rotate.html

import { useContext, useEffect } from "react";
import Rotate from 'ol/control/Rotate';
import MapContext from "../MapContext";

const RotateControl = (props) => {
    const { map } = useContext(MapContext);
    useEffect(() => {
        if (!map) return;

        let rotateControl = new Rotate(props);
        map.controls.push(rotateControl);
        
        return () => map.controls.remove(rotateControl);
    }, [map]);

    return null;
};
export default RotateControl;