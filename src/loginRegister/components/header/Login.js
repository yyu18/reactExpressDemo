import React, {useState,useContext} from 'react';
import { Modal,Button,Form } from 'react-bootstrap';
import {FormContext} from '../../context';
import {Validate} from '../../formValidator';

export const Login = () => {
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
      setErrors(Validate(formContext.state));
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
                          formContext.dispatch({
                            type:'changeUserInfo',
                            payload:event.currentTarget
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
                          formContext.dispatch({
                            type:'changeUserInfo',
                            payload:event.currentTarget
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


  
