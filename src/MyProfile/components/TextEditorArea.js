import React, { useState,useContext } from 'react';
import { MyProfileContext } from '../../context';
import EditBtn from './editBtn.jpg';
import AddBtn from './addBtn.jpg';
import { Validator } from '../validator';
import { InputGroup,FormControl,ListGroup, Dropdown,DropdownButton } from 'react-bootstrap';
import { deleteContentByIndex, changeContentByID, deleteContentByID, changeNameByID } from './CURDFunc';

const InputAreaList = (props) => {
    const myProfile = useContext(MyProfileContext);
    const handleDelete = (i) => {

        let listValue = deleteContentByIndex(i,props.info.content)
        let newState = changeContentByID(props.info.id, myProfile.state, listValue)
        if(newState) myProfile.setState(newState)
    }

    let rows = [];
    props.info.content.map((list,index)=>{
        rows.push(<ListGroup.Item key = {index+props.info.type}>{list}<i className = "fa fa-trash" onClick = {()=>handleDelete(index)} ></i></ListGroup.Item>)
        return true;
    })
    return (<>{rows}</>)
}


export const InputArea = (props) => {
    const [errors, setErrors] = useState({});
    const myProfile = useContext(MyProfileContext);

    const handleDelete = () => {
        let newState = deleteContentByID(props.info.id,myProfile.state)
        if(newState) myProfile.setState(newState)
    }
    const handleClick  = (id) => {
        let textarea = document.getElementById(id);
        textarea.classList.toggle("hide");
    }
    const EditName = () => {
        let name = document.getElementById(props.info.id+props.info.type).children[0].children[0].value;
        const error = Validator(name);
        setErrors(error);
        if(!error.error){ 
            let newState = changeNameByID(props.info.id, myProfile.state, name)
            if(newState) myProfile.setState(newState)
            let textarea = document.getElementById(props.info.id+props.info.type);
            textarea.classList.toggle("hide");     
        }
    }

    const handleEdit = (event) =>{
        event.preventDefault();
        event.stopPropagation();
        let content = document.getElementById(props.info.id).children[0].children[0].value;

        const error = Validator(content);
        setErrors(error);
        if(!error.error){ 
            props.info.content.push(content);
            let textarea = document.getElementById(props.info.id);
            textarea.classList.toggle("hide");
        }
    }
    return (
        <section>
        <div className="sectionTitle">
            <h1>{props.info.name}</h1>
            <img src={EditBtn} className="editNameBtn" alt="btn" onClick = {()=>handleClick(props.info.id+props.info.type)}/>
            <div id={props.info.id+props.info.type} className="textarea quickFade">
                <InputGroup className="mb-3">
                    <FormControl defaultValue={props.info.name}/>
                </InputGroup>
                <input type="submit" className="submitBtn" value="Edit" onClick = {EditName}/>
                {
                    errors.error &&
                    <p>{errors.info}</p>
                }
            </div>
        </div>
        <div className="sectionContent">
            <img src={AddBtn} className="addBtn" alt="btn" onClick = {()=>handleClick(props.info.id)}/>
            <div>
                <div className = "profile-p">
                <ListGroup variant="flush">
                    <InputAreaList info={props.info}/>
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

export const CheckBoxAreaList = (props)=>{
    const myProfile = useContext(MyProfileContext);
    const handleDelete = (i) => {
        let listValue = deleteContentByIndex(i,props.info.content);
        let newState = changeContentByID(props.info.id, myProfile.state, listValue);
        if(newState) myProfile.setState(newState)
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
        );
        return true;
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
    const handleClick  = (id) => {
        let textarea = document.getElementById(id);
        textarea.classList.toggle("hide");
    }
    const EditName = () => {
        let name = document.getElementById(props.info.id+props.info.type).children[0].children[0].value;
        const error = Validator(name);
        setErrors(error);
        if(!error.error){ 
            let newState = changeNameByID(props.info.id, myProfile.state, name)
            if(newState) myProfile.setState(newState)
            let textarea = document.getElementById(props.info.id+props.info.type);
            textarea.classList.toggle("hide");     
        }
    }

    const handleDelete = () => {
        myProfile.setState(
            deleteContentByID(props.info.id,myProfile.state)
        )
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
            <img src={EditBtn} className="editNameBtn" alt="btn" onClick = {()=>handleClick(props.info.id+props.info.type)}/>
            <div id={props.info.id+props.info.type} className="textarea quickFade">
                <InputGroup className="mb-3">
                    <FormControl defaultValue={props.info.name}/>
                </InputGroup>
                <input type="submit" className="submitBtn" value="Edit" onClick = {EditName}/>
                {
                    errors.error &&
                    <p>{errors.info}</p>
                }
            </div>
        </div>
        <div className="sectionContent">
            <img src={AddBtn} className="addBtn" alt="btn" onClick = {()=>handleClick(props.info.id)}/>
            <div>
                <div className = "profile-p">
                    <CheckBoxAreaList info={props.info} />
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


export const TextArea = (props) => {
    const [errors, setErrors] = useState({});
    const myProfile = useContext(MyProfileContext);

    const handleDelete = () => {
        myProfile.setState(
            deleteContentByID(props.info.id,myProfile.state)
        )
    }
    const handleClick  = (id) => {
        let textarea = document.getElementById(id);
        textarea.classList.toggle("hide");
    }
    const handleEdit = (event) =>{
        event.preventDefault();
        event.stopPropagation();
        let content = document.getElementById(props.info.id).children[0].value;
        const error = Validator(content);
        setErrors(error);
        if(!error.error){ 
            let newState = changeContentByID(props.info.id, myProfile.state, content)
            if(newState) myProfile.setState(newState)
            let textarea = document.getElementById(props.info.id);
            textarea.classList.toggle("hide");         
        }
    }
    const EditName = () => {
        let name = document.getElementById(props.info.id+props.info.type).children[0].children[0].value;
        const error = Validator(name);
        setErrors(error);
        if(!error.error){ 
            let newState = changeNameByID(props.info.id, myProfile.state, name)
            if(newState) myProfile.setState(newState)
            let textarea = document.getElementById(props.info.id+props.info.type);
            textarea.classList.toggle("hide");     
        }
    }
    return(
        <section>
        <div className="sectionTitle">
            <h1>{props.info.name}</h1>
            <img src={EditBtn} className="editNameBtn" alt="btn" onClick={() => handleClick(props.info.id+props.info.type)}/>
            <div id={props.info.id+props.info.type} className="textarea quickFade">
                <InputGroup className="mb-3">
                    <FormControl defaultValue={props.info.name}/>
                </InputGroup>
                <input type="submit" className="submitBtn" value="Edit" onClick = {EditName}/>
                {
                    errors.error &&
                    <p>{errors.info}</p>
                }
            </div>
        </div>
        <div className="sectionContent">
            <img src={AddBtn} className="addBtn" alt="btn" onClick = {() => handleClick(props.info.id)}/>
            <div>
                <p className = "profile-p">{props.info.content}</p>
                <i style={delbtn} className="fa fa-trash" onClick = {handleDelete}></i>
            </div>
            <div id={props.info.id} className="textarea quickFade">
                <textarea defaultValue={props.info.content}></textarea>
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

export const DropDownForAddArea = () => {
    const dropDownClick = (e) => {
        console.log(e.innerText)
    }
    return(
        <section>
            <div className="sectionTitle">
                <div className="quickFade">
                    <DropdownButton id="dropdown-basic-button" title="Add Area">
                        <Dropdown.Item onClick={(e)=>dropDownClick(e.currentTarget)} >TextArea</Dropdown.Item>
                        <Dropdown.Item onClick={(e)=>dropDownClick(e.currentTarget)} >InputArea</Dropdown.Item>
                        <Dropdown.Item onClick={(e)=>dropDownClick(e.currentTarget)} >CheckBoxArea</Dropdown.Item>
                    </DropdownButton>
                </div>
            </div>
            <div className="sectionContent">
                <ListGroup variant="flush">
                    <ListGroup.Item >asd<i className = "fa fa-trash"  ></i></ListGroup.Item>
                </ListGroup>
                <input type="submit" className="submitBtn" value="Add Area" />
            </div>
            <div className="clear"></div>
        </section>
        )
}