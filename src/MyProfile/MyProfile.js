import React, {useState,useMemo} from 'react';
import Cookies from 'js-cookie';
import './MyProfile.css';
import CheckToken from './CheckToken';
const checkToken = 'http://localhost:5000/profiles/users-profile';

const MyProfile = (props) => {
    const [profile,setProfile] = useState({});
    
    useMemo(()=>{
        if(profile.error===undefined){
            let email = props.match.params.userId
            fetch(checkToken+'/'+email, {
                method: 'GET', 
                headers: {
                    'Content-Type': 'application/json',
                },
                }).then(response => response.json())
                .then(data => {
                    setProfile(data)
                }).catch((error) => {
                    console.error('Error:', error)
                    setProfile({
                        error:true,
                        info:'Something Wrong'})
                });
        }
    },[profile,setProfile])
//<CheckToken profile = {profile.info} />
    if(profile.error===false){
        return(<CheckToken profile = {profile} />)
    }
    return (<h1>{profile.info}</h1>)
}
export default MyProfile