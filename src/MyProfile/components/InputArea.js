import React, { useState,useContext } from 'react';
import { MyProfileContext } from '../../context';
import EditBtn from './editBtn.jpg';
import AddBtn from './addBtn.jpg';
import { Validator } from '../validator';
import { InputGroup,FormControl,ListGroup } from 'react-bootstrap';
import { deleteContentByIndex, changeContentByID, deleteContentByID } from './CURDFunc';

const ListInputArea = (props) => {
    const myProfile = useContext(MyProfileContext);
    const handleDelete = (value) => {
        console.log(value)
        let listValue = deleteContentByIndex(value,props.info.content);

        myProfile.setState({
            ...myProfile.state,
            [props.info.type]:changeContentByID(props.info.id,myProfile.state[props.info.type],listValue)
        })
    }


    let rows = [];
    props.info.content.map((list,index)=>{
    rows.push(<ListGroup.Item key = {index+props.info.type}>{list}<i className = "fa fa-trash" onClick = {()=>handleDelete(index)} ></i></ListGroup.Item>)
    })
    return (<>{rows}</>)
}


const InputArea = (props) => {
    const [errors, setErrors] = useState({});
    const myProfile = useContext(MyProfileContext);

    const handleDelete = () => {
        console.log(props.info.type)
        let newState = deleteContentByID(props.info.id,myProfile.state[props.info.type]);
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
        let content = document.getElementById(props.info.id).children[0].children[0].value;

        const error = Validator(content);
        setErrors(error);
        if(!error.error){ 
            let listValue = props.info.content.push(content);
            let textarea = document.getElementById(props.info.id);
            textarea.classList.toggle("hide");
        }
    }
    return (
        <section>
        <div className="sectionTitle">
            <h1>{props.info.name}</h1>
            <img src={EditBtn} className="editNameBtn" alt="btn" onClick = {handleClick}/>
        </div>
        <div className="sectionContent">
            <img src={AddBtn} className="addBtn" alt="btn" onClick = {handleClick}/>
            <div>
                <div className = "profile-p">
                <ListGroup variant="flush">
                    <ListInputArea info={props.info}/>
                </ListGroup>
                </div>
                <i className = "profile-delbtn fa fa-trash" onClick = {handleDelete}></i>
            </div>
            <div id={props.info.id} className="textarea quickFade">
            <InputGroup className="mb-3">
                <FormControl
                placeholder="Editing"
                />
            </InputGroup>
                <input type="submit" className="submitBtn" value="Edit" onClick = {handleEdit} />
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

export const CheckBoxList = (props)=>{
    const myProfile = useContext(MyProfileContext);
    const handleDelete = (value) => {
        let newContent = deleteContentByIndex(value,props.info.content);
        let newState = changeContentByID(props.info.id,myProfile.state[props.info.type],newContent)

       myProfile.setState({
           ...myProfile.state,
           [props.info.type]:newState
       })
    }

    let rows = [];
    props.info.content.map((e,index)=>{
        rows.push(
            <InputGroup key = {index+props.info.type} className="mb-3">
            <InputGroup.Prepend>
                <InputGroup.Checkbox defaultChecked={e.checked} aria-label="Checkbox for following text input" />
            </InputGroup.Prepend>
            <ListGroup.Item >{e.info}</ListGroup.Item>
            <i className = "profile-delbtn fa fa-trash" onClick = {()=>handleDelete(index)}></i>
        </InputGroup>
        )
    })
    return (
        <>
       {rows}
       </>
    )
}

export const CheckBoxArea = (props) =>{
    const [errors, setErrors] = useState({});
    const myProfile = useContext(MyProfileContext);

    const handleDelete = () => {
        console.log(props.info.type)
        let newState =deleteContentByID(props.info.id,myProfile.state[props.info.type]);
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
        let content = document.getElementById(props.info.id).children[0].children[0].value;

        const error = Validator(content);
        setErrors(error);
        if(!error.error){ 
            let value = {
                checked:false,
                info:content
            }
            props.info.content.push(value);
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
    return (
        <section>
        <div className="sectionTitle">
            <h1>{props.info.name}</h1>
            <img src={EditBtn} className="editNameBtn" alt="btn" onClick = {handleClick}/>
        </div>
        <div className="sectionContent">
            <img src={AddBtn} className="addBtn" alt="btn" onClick = {handleClick}/>
            <div>
                <div className = "profile-p">
                    <CheckBoxList info={props.info} />
                </div>
                <i className = "profile-delbtn fa fa-trash" onClick = {handleDelete}></i>
            </div>
            <div id={props.info.id} className="textarea quickFade">
            <InputGroup className="mb-3">
                <FormControl />
            </InputGroup>
                <input type="submit" className="submitBtn" value="Edit" onClick = {handleEdit} />
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

export default InputArea;