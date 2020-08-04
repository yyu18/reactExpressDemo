import React, {useState,useMemo} from 'react';
import Cookies from 'js-cookie';
import { MyProfileContext } from '../context';
import TextEditor from './TextEditor';
import { makeid } from '../uniqueID';
import './MyProfile.css';
const checkToken = 'http://192.168.2.24:5000/my-profile/save';
const MyProfile = (props) => {
    const [errors,setErrors] = useState({});
    useMemo(()=>{
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
    },[errors,setErrors])

    const CheckToken = (props)=>{
        const [state,setState] = useState({	  
            textarea:[
                {   
                    id:makeid(20),
                    name:'profile',
                    content:'sdf',
                    type:'textarea'
                },
                {
                    id:makeid(20),
                    name:'experience',
                    content:'sdf',
                    type:'textarea'
                }
            ],
            input:[
                {
                    id:makeid(20),
                    name:'username',
                    content:'hubert'
                },
                {
                    id:makeid(20),
                    name:'email',
                    content:'hunt.yuyh@gmail.com'
                }
            ],
            checkbox:[
                {
                    id:makeid(20),
                    content:'wefrewgrer'
                }
            ]
            });
        const value = useMemo(()=> {
            return {
                state:state,
                setState:setState
            }
            },[state,setState])


        if(props.errors.error){
        return (<h1>{props.errors.info}</h1>)
        }
        return (
            <div id="cv" className="quickFade">
                <div id="mainArea">
                    <MyProfileContext.Provider value = {value}>
                        <TextEditor />
                    </MyProfileContext.Provider>
                </div>
            </div>
                )
    }

    return(
           <CheckToken errors = {errors} />
    )
}
export default MyProfile