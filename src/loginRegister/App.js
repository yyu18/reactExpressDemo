import React from 'react';
import Header from './components/header/Header';
import { Route, BrowserRouter as Router,Switch } from 'react-router-dom'
import ForgotPassword from './forgotPassword/ForgetPassword';
import ResetPassword from './forgotPassword/ResetPassword';
import MyProfile from '../MyProfile/MyProfile'


const App = ()=>{
        return(
                <Router>
                        <Header />
                        <Switch>
                                <Route exact path={`/order-system`} />
                                <Route path={`/order-system/myProfile/:userId`} component = {MyProfile} /> 
                                <Route path={`/order-system/forgot-password`} component={ForgotPassword} />
                                <Route path={`/order-system/reset-password`} component={ResetPassword} />
                        </Switch>
                </Router>
        )
}

export default App;