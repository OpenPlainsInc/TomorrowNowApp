/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/containers/Auth/ResetPasswordForm.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Friday, May 13th 2022, 11:33:25 am
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */


import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"


export const ResetPasswordForm = () => {


    return(
        <>
        <h1>Reset Password</h1>
        <Form>
      
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