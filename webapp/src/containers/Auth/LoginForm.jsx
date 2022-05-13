/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/containers/Auth/LoginForm.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Friday, May 13th 2022, 10:50:40 am
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"

import { LinkContainer } from "react-router-bootstrap"


export const LoginForm = () => {


    return(
        <>
        <h1>Login</h1>
        <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          {/* <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text> */}
        </Form.Group>
      
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="success" type="submit">
          Submit
        </Button>
      </Form>
      <Row>
        <div style={{marginTop:'15px'}}>
          <p>Don't have an account sign up today!</p>
          <LinkContainer to="/signup">
              <Button variant="outline-primary btn-sm">Sign Up</Button>
          </LinkContainer>
        </div>
      </Row>
      </>
    )
}