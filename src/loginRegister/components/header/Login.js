import React, {useState,useContext,useRef} from 'react';
import { Modal,Button,Form } from 'react-bootstrap';
import {FormContext} from '../../../context';
import {loginValidate} from '../../formValidator';
import Cookies from 'js-cookie';

const domain = '192.168.2.24'
var loginUrl = 'http://192.168.2.24:4000/users-status';
let resetPasswordUrl = 'http://192.168.2.24:3000/order-system/forgot-password';
export const Login = () => {
    const [show, setShow] = useState(false);
    const [formErrors,setErrors] = useState({})
    const formRef = useRef(null);
    const btnRef = useRef(null);
    const formContext = useContext(FormContext);

    const handleClose = () => {
      setShow(false);
      setErrors({});
    };
    const handleShow = () => setShow(true);
    
    const handleSubmit = async (event) => {
      event.preventDefault();
      event.stopPropagation();
      let value = {
        email:formRef.current['email'].value,
        password:formRef.current['password'].value,
      }
      let errors = loginValidate(value);
      setErrors(errors);
      if(Object.keys(errors).length!==0) return false;

      btnRef.current.setAttribute("disabled", true);
try{
  const response = await fetch(loginUrl, {
    method: 'POST', // or 'PUT'
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(value),
  })

    let data = await response.json();
    setErrors(data)
    if(data.error) return btnRef.current.removeAttribute("disabled")
    Cookies.set('userId',data.info.userId,{domain:domain})
    Cookies.set('email',data.info.email,{domain:domain})
    Cookies.set('accessToken',data.accessToken,{domain:domain})
    Cookies.set('refreshToken',data.refreshToken,{domain:domain})
    setShow(false)
    return formContext.dispatch({type:'login',payload:data}) 
} catch(err) {
  btnRef.current.removeAttribute("disabled");
  setErrors({ error:true,info:err.message})
}
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

            <Form ref={formRef} noValidate onSubmit={handleSubmit}>
              <Modal.Body>
          
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>User Account</Form.Label>
                    <Form.Control required type="email" name="email" placeholder="Enter Email" />      
              {
                formErrors.email&&
                  <Form.Text style={{color:'red'}}>
                    {formErrors.email}
                  </Form.Text>
              } 
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" />
              {
                formErrors.password &&
                  <Form.Text style={{color:'red'}}>
                    {formErrors.password}
                  </Form.Text>
                }
                  </Form.Group>

                  <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" name="checkbox" label="Remember Me" />
                        <a href={resetPasswordUrl}>Forgot The Password</a>
                  </Form.Group>
                  {
                formErrors.error &&
                  <Form.Text style={{color:'red'}}>
                    {formErrors.info}
                  </Form.Text>
              }

              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button ref={btnRef} type='submit' variant="primary">Login</Button>
              </Modal.Footer>
            </Form>

        </Modal>
      </>
    );
  }


  
