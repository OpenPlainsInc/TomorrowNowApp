/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/containers/Auth/SignupForm.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Friday, May 13th 2022, 11:18:52 am
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */

import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"


export const SignupForm = () => {


    return(
        <>
        <h1>Sign Up</h1>
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

        <Form.Group className="mb-3" controlId="formBasicRePassword">
          <Form.Label>Re-Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="success" type="submit">
          Submit
        </Button>
      </Form>
      </>
    )
}
