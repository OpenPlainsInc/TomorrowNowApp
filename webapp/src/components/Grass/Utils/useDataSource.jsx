/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/Grass/Utils/useDataSource.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Thursday, May 5th 2022, 5:00:47 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */
import { useState, useEffect } from 'react';


/**
 * Custom hook to fetch data from API.
 * @param {Object}
 * @param {Function} Object.getDataFunc - Grass.js request function
 * @param {Array} Object.params - Array of parameters required by the request function.
 * 
 * @returns { Object } - Returns an object containing the response data, loading status and sever response errors.
 * 
 */
export const useDataSource = ({getDataFunc, params = []}) => {
    const [data, setData] = useState(null)
    const [ isloading, setIsLoading ] = useState(false)
    const [ errors, setErrors ] = useState(null)
    // console.log("useDataSource", params)
    useEffect(()=> {
        if (!getDataFunc) return;
        if (data || isloading || errors) return;
    
        (async () => {
            try {
                setIsLoading(true)
                let result = await getDataFunc(...params)      
                setData(result)
            } catch (errs) {
                setErrors(errs)
            } finally {
                setIsLoading(false)
            }
            
        })()
       
      }, [getDataFunc, params, data, isloading, errors])

    return {data, errors, isloading };
}