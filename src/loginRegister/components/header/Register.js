import React, {useState,useContext, useEffect} from 'react';
import { Modal,Button,Form } from 'react-bootstrap';
import {FormContext} from '../../context';
import {Validate} from '../../formValidator';
import {setCookie} from './MenuFunctionController';
var registerURL = 'http://192.168.2.24:4000/register';

export const Register = () => {
    const [show, setShow] = useState(false);
    const [formErrors,setErrors] = useState({})

    const formContext = useContext(FormContext);

    const handleClose = () => {
      setShow(false);
    };
    const handleShow = () => setShow(true);
    
    const handleSubmit = (event) => {
      event.preventDefault();
      event.stopPropagation();
      Validate(formContext.state).then(errors=>{
        setErrors(errors);
        if(Object.keys(errors).length === 0 ){
            fetch(registerURL, {
              method: 'POST', // or 'PUT'
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(formContext.state),
            })
            .then(response => response.json())
            .then(data => {
                if(data.status==='success'){
                    setCookie('token',data.token);
                    setCookie('username',data.username);
                    setCookie('email',data.email);
                    formContext.dispatch({type:'register',payload:data})
                }
            }).catch((error) => {
                console.error('Error:', error);
            });
        }
      });
    }

    useEffect(() => {

    });
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Register
        </Button>
  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Register The Account</Modal.Title>
          </Modal.Header>

            <Form noValidate onSubmit={handleSubmit}>
              <Modal.Body>

                <Form.Group controlId="formUsername">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control required type="text" name="username" placeholder="Enter Username" onChange={
                      (event)=>
                        {
                          formContext.setFormInfo({
                            ...formContext.state,
                            [event.name]:event.value
                          })
                        }
                      }    />   
                  {
                    formErrors.username&&
                    <Form.Text style={{color:'red'}}>
                    {formErrors.username}
                    </Form.Text>
                  }   
                  
                </Form.Group>

                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>User Account</Form.Label>
                    <Form.Control required type="email" name="email" placeholder="Enter Email" onChange={
                         (event)=>
                         {
                           formContext.setFormInfo({
                             ...formContext.state,
                             [event.name]:event.value
                           })
                         }
                      }    />   
                      {formErrors.email && 
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
                           formContext.setFormInfo({
                             ...formContext.state,
                             [event.name]:event.value
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

                  <Form.Group controlId="formConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" name="confirmPassword" placeholder="Password" onChange={
                         (event)=>
                         {
                           formContext.setFormInfo({
                             ...formContext.state,
                             [event.name]:event.value
                           })
                         }
                      } />
                      {
                            formErrors.confirmPassword && 
                             <Form.Text style={{color:'red'}}>
                             {formErrors.confirmPassword}
                             </Form.Text>
                      }
             
                  </Form.Group>


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


  
