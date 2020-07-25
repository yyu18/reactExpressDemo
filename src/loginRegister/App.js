import React from 'react';
import Header from './components/header/Header';
import { Route, BrowserRouter as Router,Switch } from 'react-router-dom'
import forgotPassword from './forgotPassword/App';
const App = ()=>{
        return(
        <Router>
                <Header />
                <Switch>
                    <Route
                        path="/order-system" 
                        render={({ match: { url } }) => (
                                <>
                                  <Route path={`${url}/`} />
                                  <Route path={`${url}/forgot-password`} component={forgotPassword} />
                                </>
                              )}             
                      />
                </Switch>
        </Router>
        )
}

export default App;