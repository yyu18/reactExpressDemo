import React, { useState,useMemo } from 'react';
import { useLocation} from 'react-router-dom'
var resetPassword = 'http://192.168.2.24:4000/resetPassword';
function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

const ResetPassword = ()=>{
    let query = useQuery();
    const [errors,setErrors] = useState({});

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

    return(
        <div>
        {
            errors.status!==undefined ? 
            <h1>{errors.info}</h1>
            :
            <h1>hello world</h1>
       
        }
        </div> 
    )
} 
export default ResetPassword; 