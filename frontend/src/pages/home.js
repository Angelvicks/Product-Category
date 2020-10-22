import React from 'react';
import {NavLink, Switch, Route, Link, Redirect} from 'react-router-dom';

import PredictionPage from './Prediction';
import ResultsPage from './results';
import SettingsPage from './settings';

const HomePage = ({history, match:{url}}) => {
    const logout = () => {
        localStorage.clear();
        history.push('/login')
        window.location.reload()
    }
    return (
        <div className="predictions">
        <div className="row">
        <div className="row title">
            <div>
               <h2> Product Category Forecast</h2>
            </div>
        </div>
        </div>
        <div className="row">
        <div className="col-3">
                <div className="content">
                    <NavLink to={`${url}/prediction`}>Prediction</NavLink>
                    <NavLink to={`${url}/results`}>Results</NavLink>
                    <NavLink to={`${url}/settings`}>Account Info</NavLink>
                    <Link to={()=>{}} onClick={logout}>Logout</Link>
                </div>
            </div>
      
            <div className="col-8">
      
        <Switch>

            <Route path={`${url}/prediction`} component={PredictionPage}/>
            <Route path={`${url}/results`} component={ResultsPage}/>
            <Route path={`${url}/settings`} component={SettingsPage}/>
            <Route exact path={`${url}/`}>
                <Redirect to={`${url}/prediction`}/>
            </Route>
        </Switch>

      </div>
 
    </div>
        </div>

    )
}

export default HomePage
