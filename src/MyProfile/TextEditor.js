import React,{ useContext } from 'react';
import { MyProfileContext } from '../context';
import {InputArea, CheckBoxArea, TextArea} from './components/TextEditorArea';
//map, reduce, filter
const TextEditor = () => {
    const myProfile = useContext(MyProfileContext);
    let state = myProfile.state;
    let rows= [];   
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
                console.log('no type found');
          }
          return true
    })
    return(
        <>
            {rows}
        </>
    )
}


export default TextEditor;
