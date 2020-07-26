import React, { useState,useMemo } from 'react';
import { useLocation} from 'react-router-dom'
import { Button,Form,Container,Row,Col } from 'react-bootstrap';
var resetPassword = 'http://192.168.2.24:4000/resetPassword';
function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

const ResetPassword = ()=>{
    let query = useQuery();
    const [errors,setErrors] = useState({});

    const [password,setPassword] = useState({});

    useMemo(()=>{
        console.log(errors);
        if(errors.status===undefined && query.get('token')){
                fetch(resetPassword, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        token:query.get('token')
                    }),
                  })
                  .then(response => response.json())
                  .then(data => {
                    console.log(data);
                    if(data.status===false){
                        setErrors(data);
                    }
                  }).catch((error) => {
                      console.error('Error:', error);
                  });  
                }
            },[errors,query])
    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        console.log('hello world')
    }

    return(
        <div>
        {//errors.status!==undefined
            errors.status ? 
            <h1>{errors.info}</h1>
            :
            <Container>
                        <Row  xs={2} md={4} lg={6}>
                        <Col></Col>
                        <Col lg={4}>
                                <Form noValidate onSubmit={handleSubmit}>
                                <Form.Group controlId="formPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" name = "password" placeholder="Enter Password" onChange={(event)=>{
                                                
                                                setPassword({
                                                ...password,
                                                [event.currentTarget.name]:event.currentTarget.value
                                                })
                                                
                                        }} />
                                          {
                                                errors.password&&
                                                <Form.Text style={{color:'red'}}>
                                                        {errors.password}
                                                </Form.Text>
                                         } 
                                </Form.Group>

                                <Form.Group controlId="formConfirmPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" name = "confirmPassword" placeholder="Enter Password" onChange={(event)=>{
                                                
                                                setPassword({
                                                    ...password,
                                                    [event.currentTarget.name]:event.currentTarget.value
                                                })
                                                
                                        }} />
                                          {
                                                errors.confirmPassword&&
                                                <Form.Text style={{color:'red'}}>
                                                        {errors.confirmPassword}
                                                </Form.Text>
                                         } 
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                        Submit
                                </Button>  
                                </Form>
                        </Col>
                        <Col></Col>
                                
                        </Row>
                </Container>
       
        }
        </div> 
    )
} 
export default ResetPassword; 