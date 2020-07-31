import React, {useState,useMemo} from 'react';
import { getCookie } from '../header/MenuFunctionController';
var checkToken = 'http://192.168.2.24:5000/';
const MyProfile = (props) => {
    const [errors,setErrors] = useState({});
    useMemo(()=>{
        if(errors.error===undefined){
            const token = getCookie('token');
        
            if(!token || token ==='' ) {
                setErrors({
                    error:true,
                    info:'Please Login'
                });
                return false;
            }
            fetch(checkToken, {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(),
              }).then(response => response.json())
              .then(data => {
                  console.log(data);
                  setErrors({
                      error:false,
                      info:''
                  })
              }).catch((error) => {
                  console.error('Error:', error);
              });
        }
    })
    return(
    <h1>hello world</h1>
    )
}
export default MyProfile