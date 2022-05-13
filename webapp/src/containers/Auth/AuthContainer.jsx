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


export const AuthContainer = ({children}) => {


    return(
        <Container className={"min-vh-100"} style={{marginTop:'-50px'}}>
            <Row className="min-vh-100 justify-content-center align-items-center">
                <Col/>
                <Col>{children}</Col>
                <Col/>
            </Row>
        </Container>
    )
}