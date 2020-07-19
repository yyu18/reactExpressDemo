import React,{useReducer} from 'react';
import Header from './components/header';
import reducer from './reducer';


const App = ()=>{
    const [state,dispatch] = useReducer(reducer,null);
    const handleClick = ()=>{
        dispatch({type:'login',payload:state});
    }
    console.log('state value is :'+state);
    //dispatch({type:'',payload:state});
        return(
            <Header click = {handleClick}/>
        )
}

export default App;