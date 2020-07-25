import React, {useState,useContext} from 'react';
import { Modal,Button,Form } from 'react-bootstrap';
import {FormContext} from '../../context';
import {loginValidate} from '../../formValidator';
import {setCookie} from './MenuFunctionController';
var loginUrl = 'http://192.168.2.24:4000/login';
export const Login = () => {
    const [show, setShow] = useState(false);

    const [formErrors,setErrors] = useState({})

    const formContext = useContext(FormContext);

    const handleClose = () => {
      setShow(false);
      setErrors({});
      formContext.setLoginForm({
        email:'',
        password:'',
      })
    };
    const handleShow = () => setShow(true);
    
    const handleSubmit = (event) => {
      event.preventDefault();
      event.stopPropagation();
      loginValidate(formContext.LoginFormInfo).then(errors=>{
        setErrors(errors);
        if(Object.keys(errors).length === 0 ){
          fetch(loginUrl, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formContext.LoginFormInfo),
          })
          .then(response => response.json())
          .then(data => {
            console.log(data)
            if(data.status==='failed'){
              setErrors({
                info:data.info       
              })
            }
              if(data.status==='success'){
                  setCookie('token',data.token);
                  setCookie('username',data.username);
                  setCookie('email',data.email);
                  setShow(false);
                  formContext.dispatch({type:'login',payload:data})
              }
          }).catch((error) => {
              console.error('Error:', error);
          });
      }
      })
    }

    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Login
        </Button>
  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Login The Account</Modal.Title>
          </Modal.Header>

            <Form noValidate onSubmit={handleSubmit}>
              <Modal.Body>
          
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>User Account</Form.Label>
                    <Form.Control required type="email" name="email" placeholder="Enter Email" onChange={
                       (event)=>
                       {
                         formContext.setLoginForm({
                           ...formContext.LoginFormInfo,
                           [event.currentTarget.name]:event.currentTarget.value
                         })
                       }
                      }    />      
          {
            formErrors.email&&
              <Form.Text style={{color:'red'}}>
                {formErrors.email}
              </Form.Text>
          } 
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" onChange={
                      (event)=>
                      {
                        formContext.setLoginForm({
                          ...formContext.LoginFormInfo,
                          [event.currentTarget.name]:event.currentTarget.value
                        })
                      }
                      } />
              {
                formErrors.password &&
                  <Form.Text style={{color:'red'}}>
                    {formErrors.password}
                  </Form.Text>
                }
                  </Form.Group>

                  <Form.Group controlId="formBasicCheckbox">
          
             
                        <Form.Check type="checkbox" name="checkbox" label="Remember Me" />
                  
                        <a href="http://192.168.2.24:3000/order-system/forgot-password">Forgot The Password</a>
               
                  </Form.Group>

                  {
                formErrors.info &&
                  <Form.Text style={{color:'red'}}>
                    {formErrors.info}
                  </Form.Text>
              }

              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button type='submit' variant="primary">Login</Button>
              </Modal.Footer>
            </Form>

        </Modal>
      </>
    );
  }


  
