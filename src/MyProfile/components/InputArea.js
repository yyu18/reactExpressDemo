import React, { useState,useContext } from 'react';
import { MyProfileContext } from '../../context';
import EditBtn from './editBtn.jpg';
import AddBtn from './addBtn.jpg';
import { Validator } from '../validator';
import { InputGroup,FormControl,ListGroup } from 'react-bootstrap';

const ListInputArea = (props) => {
    const myProfile = useContext(MyProfileContext);
    const handleDelete = (value) => {
        console.log(value)
        let listValue = props.info.content.filter((list)=>{
            return list!==value
        })

        myProfile.setState({
            ...myProfile.state,
            [props.info.type]:myProfile.state[props.info.type].map((e)=>{
                if(e.id!==props.info.id) return e
                e.content=listValue;
                return e
            })
        })
    }


    let rows = [];
    props.info.content.map((list,index)=>{
    rows.push(<ListGroup.Item key = {index+props.info.type}>{list}  <i className = "fa fa-trash" onClick = {()=>handleDelete(list)} ></i></ListGroup.Item>)
    })
    return (<>{rows}</>)
}


const InputArea = (props) => {
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
        let content = document.getElementById(props.info.id).children[0].children[0].value;

        const error = Validator(content);
        setErrors(error);
        if(!error.error){ 
            let listValue = props.info.content.push(content);
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

export const CheckBoxArea = (props) =>{
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
        let content = document.getElementById(props.info.id).children[0].children[0].value;

        const error = Validator(content);
        setErrors(error);
        if(!error.error){ 
            let listValue = props.info.content.push(content);
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
    console.log(props.info)
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
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                    </InputGroup.Prepend>
                    <ListGroup.Item key = {props.info.type}>python </ListGroup.Item>
                    <i className = "profile-delbtn fa fa-trash" onClick = {handleDelete}></i>
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                    </InputGroup.Prepend>
                    <ListGroup.Item key = {props.info.type}>python </ListGroup.Item>
                    <i className = "profile-delbtn fa fa-trash" onClick = {handleDelete}></i>
                </InputGroup>
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

export default InputArea;