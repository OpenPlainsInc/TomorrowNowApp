/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/containers/Auth/Logout.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Friday, October 14th 2022, 11:25:59 am
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */
import Spinner from 'react-bootstrap/Spinner';
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../../components/Grass/Utils/Auth/useAuth";
import { useToken }  from "../../components/Grass/Utils/Auth/useToken";

export default function Logout() {
    const [loggedOut, setLoggedOut] = useState(false)
    let { logout, authed } = useAuth();
    let navigate = useNavigate();

    useEffect(() => {
        if (loggedOut) return;
        // console.log(authed)
        (async () => {
            let logoutResponse = await logout()
            console.log(logoutResponse)
            if (logoutResponse.ok) {
                setLoggedOut(true)
                return navigate('/login', {replace: true})
            }
            // if (loginResponse.token && loginResponse.expiry) { //Replace with token is valid
              // setToken(loginResponse.token)
            //   return navigate('/login', {replace: true})
            // }
        })()
    }, [loggedOut])
   

    return (
        <> 
        <Spinner animation="border" variant="primary" />
        <p>Logging user out</p>
        </>
       
    )

}