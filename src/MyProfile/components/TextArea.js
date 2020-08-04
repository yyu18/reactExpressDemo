import React, { useState,useContext } from 'react';
import { MyProfileContext } from '../../context';
import AddBtn from './addBtn.jpg';
import { Validator } from '../validator';
import { makeid } from '../../uniqueID';
const TextArea = (props) => {
    const [errors, setErrors] = useState({});
    const myProfile = useContext(MyProfileContext);

    const handleDelete = () => {
        let newState = myProfile.state[props.info.type].filter((e) => {
            return e.id!==props.info.id
        })
        myProfile.setState({
            [props.info.type]:newState
        })
        
    }

    const handleClick  = () => {
        var textarea = document.getElementById(props.info.id);
		textarea.classList.toggle("hide");
    }
    const handleSubmit = (event) =>{
        event.preventDefault();
        event.stopPropagation();
        let content = document.getElementById(props.info.id).children[0].value;
        const error = Validator(content);
        setErrors(error);
        if(!error.error){
            let value = {
                id:makeid(20),
                name:props.info.name,
                content:content,
                type:props.info.type
            }
            console.log(value);
            myProfile.setState({
                [props.info.type]:[...myProfile.state[props.info.type],value]
            })
         
        }
        console.log('hello')
    }
    return(
        <section>
        <div className="sectionTitle">
            <h1>{props.info.name}</h1>
            <img src={AddBtn} className="addBtn" alt="btn" onClick={handleClick}/>
        </div>
        <div className="sectionContent">
            <div>
                <p style={paragraph}>{props.info.content}</p>
                <i style={delbtn} className="fa fa-trash" onClick = {handleDelete}></i>
            </div>
            <div id={props.info.id} className="textarea quickFade">
                <textarea placeholder="Introduce Yourself"></textarea>
                <input type="submit" className="submitBtn" value="Submit" onClick = {handleSubmit}/>
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
	margin:"-7% 4% 0 0",
	cursor:"pointer"
}

const paragraph={
	boxSizing:"border-box",
    width:"90%",
    whiteSpace: "pre-wrap"
}

export default TextArea;