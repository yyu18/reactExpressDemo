import React, { useState,useMemo } from 'react';
import { useLocation} from 'react-router-dom'
import { Button,Form,Container,Row,Col } from 'react-bootstrap';
var resetPassword = 'http://192.168.2.24:4000/checkResetLink';
function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

const ResetPassword = ()=>{
    let query = useQuery();
    const [errors,setErrors] = useState({});

    const [password,setPassword] = useState({
        password:'',
        confirmPassword:''
    });

    useMemo(()=>{
        console.log(errors.status);
        if(errors.status===undefined){
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
        var errors = validator(password);
        setErrors(errors);
        if(Object.keys(errors).length === 0 ){
            fetch(resetPassword, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    password:password.password,
                    token:query.get('token')
                }),
              })
              .then(response => response.json())
              .then(data => {
                console.log(data);
              }).catch((error) => {
                  console.error('Error:', error);
              }); 
        }
    }


    const validator = (userInfo) => {
        let errors = {};
        
        if(userInfo.password!==undefined){
          if(userInfo.password.length===0){
                errors.password = 'Password Is Required'
          }
        } else {
            errors.password = 'Password Is Required'
        }

        if(userInfo.confirmPassword!==undefined){
            if(userInfo.confirmPassword.length===0){
                errors.confirmPassword = 'Password Is Required'
                } else if(userInfo.confirmPassword!==userInfo.password) {
                        errors.confirmPassword = "Password Is Not Compared";
                    } 
        } else {
            errors.password = 'Password Is Required'
        }
        return errors;
}

    return(
        <div>
        {
            //errors.status 
        errors.status!==undefined ? 
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
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control type="password" name = "confirmPassword" placeholder="Confirm Password" onChange={(event)=>{
                                                
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