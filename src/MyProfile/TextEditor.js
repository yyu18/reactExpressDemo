import React,{ useContext } from 'react';
import { MyProfileContext } from '../context';
import TextArea from './components/TextArea';
import InputArea, {CheckBoxArea} from './components/InputArea';
//map, reduce, filter
const TextEditor = () => {
    const myProfile = useContext(MyProfileContext);
    let state = myProfile.state;
    let sections = Object.keys(myProfile.state);
    let rows= [];
    sections.map((section,index)=>{
        switch(section) {
            case 'textarea':
                state[section].map((info,index)=>{
                    rows.push(<TextArea key={index} info={info} />);
                    return true;
                })
                break;
            case "inputList":
                state[section].map((info,index)=>{
                    rows.push(<InputArea key={index+info.type} info={info} />);
                    return true;
                })
                break;
            case "checkbox":
                state[section].map((info,index)=>{
                    rows.push(<CheckBoxArea key={index+info.type} info={info} />);
                    return true;
                })
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
