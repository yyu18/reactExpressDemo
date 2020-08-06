import React, {useState,useMemo} from 'react';
import { MyProfileContext } from '../context';
import TextEditor from './TextEditor';
import { makeid } from '../uniqueID';

const CheckToken = (props)=>{
    const [state,setState] = useState({	  
        textarea:[
            {   
                id:makeid(20),
                name:'profile',
                content:'sdf',
                type:'textarea'
            },
            {
                id:makeid(20),
                name:'experience',
                content:'sdf',
                type:'textarea'
            }
        ],
        inputList:[
            {
                id:makeid(20),
                name:'username',
                content:[
                    'aawd','qwdsad','sadfewfew','wefsdf'
                ],
                type:'inputList'
            },
            {
                id:makeid(20),
                name:'email',
                content:[
                    'aawd','qwdsad','sadfewfew','wefsdf'
                ],
                type:'inputList'
            }
        ],
        checkbox:[
            {
                id:makeid(20),
                name:'Computer Skills',
                content:[
                    {
                        checked:false,
                        info:'aawd'
                    },
                    {
                        checked:false,
                        info:'aawd'
                    },
                    {
                        checked:false,
                        info:'aawd'
                    },
                    {
                        checked:false,
                        info:'aawd'
                    }
                ],
                type:'checkbox'
            }
        ]
        });
    const value = useMemo(()=> {
        return {
            state:state,
            setState:setState
        }
        },[state,setState])


    if(props.errors.error){
    return (<h1>{props.errors.info}</h1>)
    }
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