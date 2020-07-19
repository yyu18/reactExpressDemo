import React,{useReducer,useState,useMemo} from 'react';
import Header from './components/header/Header';
import reducer from './reducer';
import {FormContext} from './context';





const App = ()=>{
    const [state,dispatch] = useReducer(reducer,null);

    const [LoginUserInfo, setLoginUserInfo] = useState({
        email:'',
        password:'',
        isLoading:false
    });
    
    const handleClick = ()=>{
        dispatch({type:'login',payload:state});
    }

    const value = useMemo(()=> {
        return {
            state:LoginUserInfo,
            setLoginUserInfo:setLoginUserInfo
        }
    },[LoginUserInfo])
    console.log('state value is :'+state);
    //dispatch({type:'',payload:state});
        return(
            <FormContext.Provider value = {value}>
                <Header click = {handleClick}/>
            </FormContext.Provider>
        )
}

export default App;