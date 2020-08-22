import React, {useState,useContext,useRef} from 'react';
import { Modal,Button,Form } from 'react-bootstrap';
import {FormContext} from '../../../context';
import {Validate} from '../../formValidator';
import Cookies from 'js-cookie';
var registerURI = 'http://192.168.2.24:4000/users-account';
const domain = '192.168.2.24'
export const Register = () => {
    const [show, setShow] = useState(false);
    const [formErrors,setErrors] = useState({})
    const formRef = useRef(null)
    const btnRef = useRef(null)
    const formContext = useContext(FormContext)

    const handleClose = () => {
      setShow(false);
      setErrors({});
      formContext.setRegisterForm({
        username:'',
        email:'',
        password:'',
        confirmPassword:''
      })
    };
    const handleShow = () => setShow(true);
    
    const handleSubmit = (event) => {
      event.preventDefault();
      event.stopPropagation();
      let value = {
        username:formRef.current['username'].value,
        email:formRef.current['email'].value,
        password:formRef.current['password'].value,
        confirmPassword:formRef.current['confirmPassword'].value
      }
      Validate(value).then(errors=>{
        setErrors(errors);
        if(Object.keys(errors).length === 0 ){
          btnRef.current.setAttribute("disabled", true);
            fetch(registerURI, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(value),
            })
            .then(response => response.json())
            .then(data => {
              setErrors(data)
              if(data.error) return btnRef.current.removeAttribute("disabled");
              Cookies.set('userId',data.info.userId,{domain:domain})
              Cookies.set('email',data.info.email,{domain:domain})
              Cookies.set('accessToken',data.accessToken,{domain:domain})
              Cookies.set('refreshToken',data.refreshToken,{domain:domain})
              setShow(false)
              return formContext.dispatch({type:'login',payload:data}) 
            }).catch((err) => {
                btnRef.current.removeAttribute("disabled");
                setErrors({error:true,info:err.message})
            });
        }
      });
    }

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

            <Form noValidate ref = {formRef} onSubmit={handleSubmit}>
              <Modal.Body>
           
                <Form.Group controlId="formUsername">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control required type="text" name="username" placeholder="Enter Username" onChange={
                      (event)=>
                        {
                          formContext.setRegisterForm({
                            ...formContext.RegisterFormInfo,
                            [event.currentTarget.name]:event.currentTarget.value
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
                           formContext.setRegisterForm({
                             ...formContext.RegisterFormInfo,
                             [event.currentTarget.name]:event.currentTarget.value
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
                           formContext.setRegisterForm({
                             ...formContext.RegisterFormInfo,
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

                  <Form.Group controlId="formConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" name="confirmPassword" placeholder="Password" onChange={
                         (event)=>
                         {
                           formContext.setRegisterForm({
                             ...formContext.RegisterFormInfo,
                             [event.currentTarget.name]:event.currentTarget.value
                           })
                         }
                      } />
                      {
                            formErrors.confirmPassword && 
                             <Form.Text style={{color:'red'}}>
                             {formErrors.confirmPassword}
                             </Form.Text>
                      }
                      {
                          formErrors.error&&
                          <Form.Text style={{color:'red'}}>
                          {formErrors.info}
                          </Form.Text>
                        }   
                  </Form.Group>


              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button ref={btnRef} type='submit' variant="primary">Register</Button>
              </Modal.Footer>
            </Form>

        </Modal>
      </>
    );
  }


  
