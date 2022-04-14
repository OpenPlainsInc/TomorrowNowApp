/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/OpenLayers/Views/View.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Saturday, April 9th 2022, 1:48:57 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */


import React, { useState, useEffect } from 'react';
import { OlView } from 'ol';
import MapContext from "./MapContext";

// https://openlayers.org/en/latest/apidoc/module-ol_View-View.html

const View = (props) => {
    const { map } = useContext(MapContext);
    const [view, setView] = useState(null);

    useEffect(() => {
        if (!map) return;
        let view = new OlView({ 
          ...props
        })
        map.setView(view)
    },[props])

    return null;
};

export default View;