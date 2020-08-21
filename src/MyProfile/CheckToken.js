import React, {useState,useMemo} from 'react';
import { MyProfileContext } from '../context';
import TextEditor from './TextEditor';
import { makeid } from '../uniqueID';

const CheckToken = (props)=>{
    const [state,setState] = useState(props.profile.info.myProfile);
    const value = useMemo(()=> {
        return {
            state:state,
            setState:setState
        }
        },[state,setState])

    return (
        <div id="cv" className="quickFade">
            <div id="mainArea">
                <MyProfileContext.Provider value = {value}>       
                        <TextEditor />
                </MyProfileContext.Provider>
            </div>
        </div>
            )
}

export default CheckToken