import React, {useEffect, useState} from 'react';
import Spinner from '../components/spinner.component';
import { getLocalStorage } from '../utils/core'; 

import '../styles/settings.style.scss';

const Settings = () => {
        const info = getLocalStorage('user-info')

        const [loading, setLoading] = useState(true)
        useEffect(() => {
            setTimeout(() => {
                setLoading(false)
            }, 300);
        }, [])
        if (loading){
            return <Spinner/> 
        }
        return (
            <>
        <div className="container settings">
                <div className="row">
                <h4>Personal Account Information</h4>
                </div>

                <div className="row">
                    <form className="form">
                        <div className="row">
                            <div className="col-4">
                                <label htmlFor="Full Name">Full Name:</label>
                            </div>
                            <div className="col-7">
                                <input type="text" placeholder={info.fullName} disabled />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4">
                                <label htmlFor="Email">Email Addresse:</label>
                            </div>
                            <div className="col-7">
                                <input type="text" placeholder={info.email} disabled/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4">
                                <label htmlFor="Gender">Gender:</label>
                            </div>
                            <div className="col-7">
                                <input type="text" placeholder={info.gender} disabled/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4">
                                <label htmlFor="Gender">Country:</label>
                            </div>
                            <div className="col-7">
                                <input type="text" placeholder={info.country} disabled/>
                            </div>
                        </div>
                    </form>
                </div>
                </div>

                </>
         )
    }

export default Settings;