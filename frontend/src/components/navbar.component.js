import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import '../styles/navbar.style.scss'
import { getLocalStorage } from '../utils/core'; 

const NavBar = () => {
    const info = getLocalStorage('user-info')


    return (
        <>
            <header className="header">
                <div className="container">
                    <div className="row">
                        <div className="col">
                
                            <NavLink activeClassName="active" to="/dashboard">Home</NavLink> 
                            {/* <NavLink activeClassName="active" to="/statistics">Statistics</NavLink> */}
                        
                        </div>
                        <div className="col">
                            {
                                !info? 
                                <>
                                <NavLink activeClassName="active" to="/signup">Signup</NavLink> 
                                <NavLink activeClassName="active" to="login">Login</NavLink>
                                </>:

                                <Link className="active" to="/">{info.fullName}</Link>

                            }
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default NavBar
