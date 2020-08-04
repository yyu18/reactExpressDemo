import React,{ useContext } from 'react';
import { MyProfileContext } from '../context';
import TextArea from './components/TextArea'
//map, reduce, filter
const TextEditor = () => {
    const myProfile = useContext(MyProfileContext);
    let state = myProfile.state;
    let sections = Object.keys(myProfile.state);
    let rows= [];
    sections.map((section,index)=>{
        switch(section) {
            case 'textarea':
                console.log('textarea');
                state[section].map((info,index)=>{
                    rows.push(<TextArea key={index} info={info} />);
                    return true;
                })
                break;
            case "input":
                console.log('input')
                break;
            case "checkbox":
                console.log('checkbox')
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
