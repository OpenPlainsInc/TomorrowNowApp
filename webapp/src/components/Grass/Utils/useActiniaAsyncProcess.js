/*
 * Filename: useActiniaAsyncProcess.js
 * Project: TomorrowNow
 * File Created: Thursday May 19th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Mon Oct 24 2022
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

import React, {useState, useEffect, useCallback} from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
const ACTINIA_SOCKET_URL = 'ws://localhost:8005/ws/savana/resource/'

export const useActiniaAsyncProcess = ({status, resourceId, messageType="resource_message"}) => {
    const [socketUrl, setSocketUrl] = useState(null); // pending...
    const [messageHistory, setMessageHistory] = useState(['test']);
    const { sendJsonMessage, lastMessage, lastJsonMessage, readyState } = useWebSocket(socketUrl, { share: false });
    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
      }[readyState];

    // Open Websocket Connention for resource
    useEffect(()=> {
        if (!resourceId || !status) return;
        console.log("Starting Websocket...")
        console.log(`Websocket: Resource Id: ${resourceId}`)
        let resourceName = resourceId.replace(/-/g , '_')
        console.log(`Websocket: Resource Name: ${resourceName}`)
        setSocketUrl( `${ACTINIA_SOCKET_URL}${resourceName}/`)
    },[status, resourceId])

    // Send websocket status message to server
    useEffect(()=> {
        if (readyState !== ReadyState.OPEN) return;
        console.log("Sending Websocket Message: ", status)
        setMessageHistory([{message: status, resource_id: resourceId, message_type: messageType}])
        sendJsonMessage({message: status, resource_id: resourceId, message_type: messageType})
    },[readyState])

    // // Log last message from Websocket
    // useEffect(()=> {
    //     if (readyState !== ReadyState.OPEN) return;
    //     console.log("Last Websocket Message", lastMessage)
    // },[readyState, lastMessage])

    // Get Websocket message history
    useEffect(() => {
        if (lastMessage !== null) {
            setMessageHistory((prev) => prev.concat(lastMessage));
        }
    }, [lastMessage]);

    // Set source data once data is finished
    useEffect(() => {
        if (!lastJsonMessage) return;
        console.dir('Last JSON Message', lastJsonMessage)
    }, [lastJsonMessage])

    return {lastJsonMessage, messageHistory, wsState: readyState}

    
}