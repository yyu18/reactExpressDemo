import React, {useState,useMemo,useRef} from 'react';
import { Button } from 'react-bootstrap';
import './MyProfile.css';
import Cookies from 'js-cookie';
import TextEditor from './TextEditor'
import { MyProfileContext } from '../context';
const usersProfileURI = 'http://192.168.2.24:5000/profiles/users-profile';

const MyProfile = (props) => {
    let accessToken = Cookies.get('accessToken')
    let userId = props.match.params.userId
    const [profile,setProfile] = useState({})
    const [state,setState] = useState([])
    const [image,setImage] = useState([])
    const btnRef = useRef(null)
//create profile
    const handleCreate=()=>{
        btnRef.current.setAttribute("disabled", true);
        fetch(usersProfileURI, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+accessToken
            },
            }).then(response => response.json())
            .then(data => {
                setProfile(data)
                if(data.error)  return btnRef.current.removeAttribute("disabled")
                return
            }).catch((error) => {
                btnRef.current.removeAttribute("disabled");
                setProfile({
                    error:true,
                    info:error.message
                })
            })
    }
    //get the profile
    useMemo(()=>{
        if(profile.error===undefined){
            fetch(usersProfileURI+'/'+userId, {
                method: 'GET', 
                headers: {
                    'Content-Type': 'application/json',
                },
                }).then(response => response.json())
                .then(data => {
                    if(!data.error) {   
                        setState(data.info.myProfile)
                        setImage(data.info.image)
                    }
                    return setProfile(data)
                }).catch((error) => {
                    return setProfile({
                        error:'fetch',
                        info:error.message
                    })
                });
        }
    },[profile,setProfile,userId,setImage])

    const value = useMemo(()=> {
        return {
            state : state,
            setState : setState,
            image : image,
            setImage:setImage,
            userId : userId
        }
        },[state,setState,image,setImage,userId])

//three situation, false, true, undefined
    if(profile.error===false) return(
        <div id="cv" className="quickFade">
            <div id="mainArea">
                <MyProfileContext.Provider value = {value}>       
                        <TextEditor />
                </MyProfileContext.Provider>
            </div>
        </div>
    )
    
    if(profile.error===true&&accessToken) return(<>
            <div style={{margin:"auto",width:"fit-content"}}>
                <h1>{profile.info}</h1>
                
                <Button variant="primary"ref={btnRef} onClick = {handleCreate}> Create Profile </Button>
            </div>
            </>)
    return (<>
    <div style={{margin:"auto",width:"fit-content"}}>
        <h1>{profile.info}</h1>
    </div>
    </>)
}
export default MyProfile