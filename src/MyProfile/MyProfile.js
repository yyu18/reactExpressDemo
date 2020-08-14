import React, {useState,useMemo} from 'react';
import Cookies from 'js-cookie';
import './MyProfile.css';
import CheckToken from './CheckToken';
const checkToken = 'http://192.168.2.24:5000/profiles/users-profile/123';

const MyProfile = (props) => {
    const [errors,setErrors] = useState({});
    /*useMemo(()=>{
        if(errors.error===undefined){
            const token = Cookies.get('token');
        
            if(!token) { setErrors({ error:true, info:'Please Login' }); return false; }
            fetch(checkToken, {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' +token
                },
                body: JSON.stringify(),
              }).then(response => response.json())
              .then(data => {
                  console.log(data);
                  setErrors(data)
              }).catch((error) => {
                  console.error('Error:', error);
                  setErrors({ error:true, info:'Connection Errors' }); return false;
              });
        }
    },[errors,setErrors])*/

    return(
           <CheckToken errors = {errors} />
    )
}
export default MyProfile