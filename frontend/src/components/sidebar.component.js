import React from 'react';
import {NavLink } from 'react-router-dom';
import '../styles/sidebar.style.scss'

const SideBar = () => {
    return (
        <>
            <header className="header">
                < div className= "container">
                <div className="col">
                
                            <NavLink activeClassName="active" to="/prediction">Prediction</NavLink> 
                            <NavLink activeClassName="active" to="/Results">Results</NavLink>
                            <NavLink activeClassName="active" to="/Settings">Settings</NavLink> 
                            <NavLink activeClassName="active" to="/About">About</NavLink>
                            <NavLink activeClassName="active" to="/Logout">Logout</NavLink>
            </div></ div>     
            </header>
            </>
    )
}

export default SideBar
