import React, { useState,useMemo,useRef } from 'react';
import { useLocation} from 'react-router-dom'
import { Button,Form,Container,Row,Col } from 'react-bootstrap';
var resetPasswordURI = 'http://192.168.2.24:4000/password-management';
function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

const ResetPassword = ()=>{
    let query = useQuery();
    const [validLink,checkValidLink] = useState({});
    const inputRef = useRef(null);
    const btnRef = useRef(null);
    const [errors,setErrors] = useState({})

    useMemo(()=>{
        if(validLink.error===undefined){
            if(query.get('token')){
                fetch(resetPasswordURI+'/'+query.get('token'), {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                  })
                  .then(response => response.json())
                  .then(data => {
                    console.log(data);
                    checkValidLink(data);
                  }).catch((error) => {
                    checkValidLink({
                        error:true,
                        info:'Something wrong'
                    });
                      console.error('Error:', error);
                  });  
            } else {
                checkValidLink({
                    error:true,
                    info:'Link Is Invalid'
                })
            }
                }
            },[validLink,query])
    const handleSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        let value = {
            password:inputRef.current['password'].value,
            confirmPassword:inputRef.current['confirmPassword'].value
        }
        let errors = validator(value);
        setErrors(errors);
        if(Object.keys(errors).length === 0 ){
            btnRef.current.setAttribute("disabled", true);
            try{
                let response = await fetch(resetPasswordURI+'/'+query.get('token'), {
                    method: 'PATCH', 
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        password:value.password,
                    }),
                  })
                  let data = await response.json();
                  setErrors(data);
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
        
        if(userInfo.password!==undefined){
          if(userInfo.password.length===0){
                errors.password = 'Password Is Required'
          } else if(userInfo.password.length<6){
            errors.password = 'Password Length Must Be Greater Than 6';
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
        <>
        {
            //errors.status 
        validLink.error ? 
            <h1>{validLink.info}</h1>
            :
            <Container>
                        <Row  xs={2} md={4} lg={6}>
                        <Col></Col>
                        <Col lg={4}>
                                <Form ref={inputRef} noValidate onSubmit={handleSubmit}>
                                <Form.Group controlId="formPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" name = "password" placeholder="Enter Password"/>
                                          {
                                                errors.password&&
                                                <Form.Text style={{color:'red'}}>
                                                        {errors.password}
                                                </Form.Text>
                                         } 
                                </Form.Group>

                                <Form.Group controlId="formConfirmPassword">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control type="password" name = "confirmPassword" placeholder="Confirm Password"/>
                                          {
                                                errors.confirmPassword&&
                                                <Form.Text style={{color:'red'}}>
                                                        {errors.confirmPassword}
                                                </Form.Text>
                                         } 
                                </Form.Group>
                                <Button ref={btnRef} variant="primary" type="submit">
                                        Submit
                                </Button>  
                                        {
                                                errors.error!==undefined&&
                                                <Form.Text style={{color:'red'}}>
                                                        {errors.info}
                                                </Form.Text>
                                         } 
                                </Form>
                        </Col>
                        <Col></Col>
                                
                        </Row>
                </Container>
       
        }
        </> 
    )
} 
export default ResetPassword; 