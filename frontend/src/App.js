import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from './pages/home';
import PageNotFound from './pages/404page';
import NavBar from './components/navbar.component';
import SignupPage from './pages/signup';
import Statistics from './pages/statistics';
import LoginPage from './pages/login';
import ProtectiveRoute from './utils/protected-route';
import NoneProtectiveRoute from './utils/non-protected-route';

import AboutPage from './pages/about';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'toastr/toastr.scss';

const App = () => (
  <React.Fragment>
        <NavBar/>
        <Switch>
            <NoneProtectiveRoute exact path="/login" component={LoginPage} />
            <NoneProtectiveRoute exact path="/signup" component={SignupPage} />
            <Route exact path="/statistics" component={Statistics} />
            <Route exact path="/about"component={AboutPage}/>
            <ProtectiveRoute path="/dashboard" component={HomePage} />
            <Route exact path="/">
                <Redirect to="/login"/>
            </Route>
            <Route exact path="/dashboard">
                <Redirect to="/prediction"/>
            </Route>
            <Route exact path="*" component={PageNotFound} />
            
        </Switch>
    </React.Fragment>
);
export default App;
