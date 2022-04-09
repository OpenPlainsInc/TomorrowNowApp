/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/OpenLayers/Views/View.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Saturday, April 9th 2022, 1:48:57 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */


import React, { useState, useEffect } from 'react';
import { View } from 'ol';
import MapContext from "./MapContext";


const View = (props) => {
    const { map } = useContext(MapContext);
    const [view, setView] = useState(null);

    useEffect(() => {
        let view = new ol.View({ 
          zoom, 
          center,
          projection // 4326 //EPSG:3857 
        })

    return null;
};

export default View;