/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/Grass/Utils/GrassDataSource.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Thursday, May 5th 2022, 2:36:07 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */


import React, { useEffect, useState } from "react"

/**
 * 
 * @param {async function} getDataFunc 
 * @param {string} resourceName
 * @param {children} 
 * @returns 
 */

export const GrassDataSource = ({getDataFunc, resourceName, children}) => {
    const [state, setState] = useState(null)

    useEffect(() => {
        (async () => {
            let data = await getDataFunc()
            setState(data)
        })()
    }, [resourceUrl])

    return (
        <>
            {
                React.Children.map(children, child => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child, {[resourceName]: state})
                    }
                    return child
                })
            }
        </>
    )
}