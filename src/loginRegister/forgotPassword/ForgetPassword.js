import React, { useState,useRef } from 'react';
import { Button,Form,Container,Row,Col } from 'react-bootstrap';
const forgotPasswordURI = ' http://localhost:4000/password-management';
const ForgetPassword = ()=>{
        const formRef = useRef(null);
        const [errors,setErrors] = useState({});
        const btnRef = useRef(null);

        const handleSubmit = async (event) => {
                event.preventDefault();
                event.stopPropagation();
                let value = {
                        email:formRef.current['email'].value
                }
                var errors = validator(value);
                setErrors(errors);
                if(Object.keys(errors).length === 0 ){
                        btnRef.current.setAttribute("disabled", true);
                        try{
                                console.log('fetch send')
                                let response = await fetch(forgotPasswordURI+'/'+value.email, {
                                        method: 'GET', // or 'PUT'
                                        headers: {
                                            'Content-Type': 'application/json',
                                        }
                                      })
                                let data = await response.json();
                                setErrors(data)
                                if(data.error){
                                        btnRef.current.removeAttribute("disabled");
                                }
                        } catch(err) {
                                btnRef.current.removeAttribute("disabled");
                                setErrors({
                                        error:true,
                                        info:'Something Wrong, Hubert Is Digging Out'
                                    })
                                console.log(err);
                        }
                }
        }

        const validator = (userInfo) => {
                let errors = {};
                if(userInfo.email!==undefined){
                        if(userInfo.email.length===0){
                                errors.email = 'Email Is Invalid'
                        } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userInfo.email)){
                                errors.email = 'Email Is Invalid';
                                }
                }
                return errors;
        }
        return(
                <Container >
                        <Row  xs={2} md={4} lg={6}>
                        <Col></Col>
                        <Col lg={4}>
                                <Form ref={formRef} noValidate onSubmit={handleSubmit} >
                                <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control  type="email" name = "email" placeholder="Enter email" />

                                        {
                                                errors.email&&
                                                <Form.Text style={{color:'red'}}>
                                                        {errors.email}
                                                </Form.Text>
                                        } 
                                        {
                                                errors.error!==undefined&&
                                                <Form.Text style={{color:'red'}}>
                                                        {errors.info}
                                                </Form.Text>
                                        } 
                                </Form.Group>
                                <Button ref={btnRef} variant="primary" type="submit">
                                        Submit
                                </Button>  
                                </Form>
                        </Col>
                        <Col></Col>
                                
                        </Row>
                </Container>
        )
}

export default ForgetPassword;