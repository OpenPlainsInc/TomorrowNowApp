/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/containers/Auth/AuthContainer.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Friday, May 13th 2022, 10:50:54 am
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */

import './auth.scss'
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Image from 'react-bootstrap/Image'

export const AuthContainer = ({children}) => {


    return(
        <Container className={"text-dark"} style={{marginTop:'-50px', height: '100vh'}}>
            <Row className="min-vh-100 justify-content-center align-items-center">
                
                <Col/>
                <Col>
                <Image fluid src="./banner_v1.png"></Image>
                {children}
                </Col>
                <Col/>
            </Row>
        </Container>
    )
}