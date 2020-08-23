import React from 'react';
import Header from './loginRegister/components/header/Header';
import { Route, BrowserRouter as Router,Switch } from 'react-router-dom'
import ForgotPassword from './loginRegister/forgotPassword/ForgetPassword';
import ResetPassword from './loginRegister/forgotPassword/ResetPassword';
import MyProfile from './MyProfile/MyProfile'
import Profiles from './AllProfiles/Profiles'
import Footer from './Footer/Footer'

const App = ()=>{
        return(
                <Router>
                        <Header />
                        <Switch>
                                <Route exact path={`/order-system`} component={Profiles}/>
                                <Route path={`/order-system/myProfile/:userId`} component = {MyProfile} /> 
                                <Route path={`/order-system/forgot-password`} component={ForgotPassword} />
                                <Route path={`/order-system/reset-password`} component={ResetPassword} />
                        </Switch>
                        <Footer />
                </Router>
        )
}

export default App;