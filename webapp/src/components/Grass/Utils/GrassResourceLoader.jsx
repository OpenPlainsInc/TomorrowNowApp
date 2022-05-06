/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/Grass/Utils/GrassResourceLoader.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Thursday, May 5th 2022, 2:25:18 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */

import { useEffect } from "react"


export const GrassResourceLoader = ({resourceUrl, resourceName, children}) => {
    const [state, setState] = useState(null)

    useEffect(() => {
        (async () => {
            let response = fetch(resourceUrl)
            setState(response.data)
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