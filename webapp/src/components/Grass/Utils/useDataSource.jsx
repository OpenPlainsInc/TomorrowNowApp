/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/Grass/Utils/useDataSource.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Thursday, May 5th 2022, 5:00:47 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */
import { useState, useEffect} from 'react';

export const useDataSource = getDataFunc => {
    const [data, setData] = useState(null)

    useEffect(()=> {
        if (!getDataFunc) return;

        let isMounted = true;
        (async () => {
            let result = await getDataFunc
            setData(result)
        })()
        return () => { isMounted = false } 
    }, [])

    return data;
}