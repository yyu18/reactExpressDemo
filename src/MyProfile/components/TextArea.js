import React, { useState,useContext } from 'react';
import { MyProfileContext } from '../../context';
import EditBtn from './editBtn.jpg';
import AddBtn from './addBtn.jpg';
import { Validator } from '../validator';
const TextArea = (props) => {
    const [errors, setErrors] = useState({});
    const myProfile = useContext(MyProfileContext);

    const handleDelete = () => {
        console.log(props.info.type)
        let newState = myProfile.state[props.info.type].filter((e) => {
            return e.id!==props.info.id
        })
        myProfile.setState({
            ...myProfile.state,
            [props.info.type]:newState
        })
    }

    const handleClick  = () => {
        let textarea = document.getElementById(props.info.id);
		textarea.classList.toggle("hide");
    }
    const handleEdit = (event) =>{
        event.preventDefault();
        event.stopPropagation();
        let content = document.getElementById(props.info.id).children[0].value;
        const error = Validator(content);
        setErrors(error);
        if(!error.error){ 
            let newState = myProfile.state[props.info.type].filter((e)=>{
                if(e.id!==props.info.id) return e;
                return e.content = content 
            })
            myProfile.setState({
                ...myProfile.state,
                [props.info.type]:newState
            })
            let textarea = document.getElementById(props.info.id);
            textarea.classList.toggle("hide");
            /*
            //add new textarea
            let value = {
                id:makeid(20),
                name:props.info.name,
                content:content,
                type:props.info.type
            }
            console.log(value);
            myProfile.setState({
                [props.info.type]:[...myProfile.state[props.info.type],value]
            })*/
         
        }
    }
    return(
        <section>
        <div className="sectionTitle">
            <h1>{props.info.name}</h1>
            <img src={EditBtn} className="editNameBtn" alt="btn" onClick={handleClick}/>
        </div>
        <div className="sectionContent">
        <img src={AddBtn} className="addBtn" alt="btn" onClick = {handleClick}/>
            <div>
                <p className = "profile-p">{props.info.content}</p>
                <i style={delbtn} className="fa fa-trash" onClick = {handleDelete}></i>
            </div>
            <div id={props.info.id} className="textarea quickFade">
                <textarea placeholder="Introduce Yourself" defaultValue={props.info.content}></textarea>
                <input type="submit" className="submitBtn" value="Edit" onClick = {handleEdit}/>
                {
                    errors.error &&
                    <p>{errors.info}</p>
                }
            </div>

        </div>
        <div className="clear"></div>
    </section>
        )
}
const delbtn={
	float:"right",
	cursor:"pointer"
}

const paragraph={
	boxSizing:"border-box",
    width:"90%",
    whiteSpace: "pre-wrap"
}

export default TextArea;