/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/containers/Auth/LoginForm.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Friday, May 13th 2022, 10:50:40 am
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */

import React from "react";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import { login } from "./admin"
import { LinkContainer } from "react-router-bootstrap"
import {useForm, Controller} from "react-hook-form";
import { useNavigate } from "react-router-dom";

/**
 * LoginForm component 
 * @returns {<LoginForm>}
 */
export const LoginForm = () => {
  const { handleSubmit, control, reset, setError, clearErrors, formState: { isValid, isSubmitting, errors } } = useForm();
  let navigate = useNavigate();

  const onSubmit = async (data, e) => {
      e.preventDefault()
      clearErrors()
      let loginResponse = await login(data)
      
      if (loginResponse.redirect) {
        return navigate('/dashboard', {replace: true})
      }

      let responseError = await loginResponse.non_field_errors

      // return throw new Error(loginResponse)
      if (responseError) {
        
        // console.log(responseData.non_field_errors)
        setError('server_error', {type: 'custom', message: responseError})
        console.log(responseError, errors)
      }
  }

  const onError = async (errResponse, e) => {
    console.log(errors, e)
    let error = await errResponse.non_field_errors
    if (error.non_field_errors) {
      setError('server_error', {type: 'custom', message: error})
    }
  }

    return(
        <>
        <h1>Login</h1>
        <Form onSubmit={handleSubmit(onSubmit, onError)} onReset={reset}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Controller 
            control={control}
            name={"username"}
            defaultValue="" 
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value, ref },
            fieldState: { invalid, isTouched, isDirty, error },
            formState, 
            }) => (  
              <Form.Control
              ref={ref}
              type="text"
              placeholder="Enter username"
              value={value}
              onChange={onChange}
              autoFocus
              isInvalid={errors.username}
            />)}
          />
          <Form.Control.Feedback type="invalid">                                                     
            {errors.username?.type === 'required' ? "Username is required" : null}                                                               
          </Form.Control.Feedback>  
        </Form.Group>
      
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Controller 
            control={control}
            name={"password"}
            defaultValue=""
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value, ref },
              fieldState: { invalid, isTouched, isDirty, error },
              formState, }) => (  
              <Form.Control
                ref={ref}
                type="password"
                placeholder="Password"
                value={value}
                onChange={onChange}
              />
            )}
          />
          <Form.Control.Feedback type="invalid">                                                     
            {errors.password?.type === 'required' ? "Username is required" : null}                                                               
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control.Feedback type="invalid">
            {errors.server_error?.type === 'custom' ? errors.server_error?.message?.map(err => <p key={err}>err</p>) : null}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="success" type="submit" disabled={isSubmitting} >
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