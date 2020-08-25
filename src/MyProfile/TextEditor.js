import React,{ useContext,useRef,useState } from 'react';
import { MyProfileContext } from '../context';
import Cookies from 'js-cookie';
import { InputArea, CheckBoxArea, TextArea, DropDownForAddArea,ProfileImage } from './components/TextEditorArea';
import { Button } from 'react-bootstrap';
const updateURI = 'http://192.168.2.24:5000/profiles/users-profile'
//map, reduce, filter
const TextEditor = () => {
    const myProfile = useContext(MyProfileContext)
    const btnRef = useRef(null)
    let userId = myProfile.userId
    let accessToken = Cookies.get('accessToken')
    let state = myProfile.state;
    const [Feedback,setFeedback] = useState({})
    let rows= [];   
    const handleUpdate = ()=>{
        btnRef.current.setAttribute("disabled", true);
        fetch(updateURI+'/'+userId, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'Bearer ' + accessToken
            },
            body:JSON.stringify({
                info:state
            })
        }).then(response => response.json())
            .then(data => {
                btnRef.current.removeAttribute("disabled");
                setFeedback(data)
            }).catch((error) => {
                if(btnRef) btnRef.current.removeAttribute("disabled");
                setFeedback({
                    error:true,
                    info:error.message
                })
            })
    }
    if(state){
        state.map((section,index)=>{        
            switch(section.type) {
                case 'textarea':
                    rows.push(<TextArea key={index} info={section} />);
                    break;
                case "inputList":
                    rows.push(<InputArea key={index+section.type} info={section} />);
                    break;
                case "checkbox":
                    rows.push(<CheckBoxArea key={index+section.type} info={section} />);
                    break;
                default:
                    throw new Error('case not handle')
              }
              return true
        })
    }

    return(
        <>
            <DropDownForAddArea />
            <ProfileImage />
            {rows}
            <Button ref={btnRef} onClick = {handleUpdate}variant="primary" >Save Profile</Button>
            {
                Feedback.error!==undefined&&
                  <p style={{color:'red'}}>
                    {Feedback.info}
                  </p>
              } 
        </>
    )
}


export default TextEditor;
