import React, {useEffect, useState} from 'react';
import Spinner from '../components/spinner.component';
import {setLocalStorage} from '../utils/core';
import {makeRequest} from '../utils/makerequest';
import { toastError, toastSuccess } from '../utils/toastr';

const LoginPage = ({history}) => {
    
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setLocalStorage('count', true);
        setTimeout(() => {
            setLoading(false)
        }, 300);
    }, [])
    if (loading){
        return <Spinner/> 
    }
    const login = async (e) => {
        e.preventDefault()
        const data = {
            email, password
        }
       await makeRequest('/login', 'post', data).then(({data : {message, success, response}}) => {
           if(success){
            setLocalStorage('user-info', response)
            history.push('/dashboard')
            window.location.reload()
            toastSuccess(message)
           }else{
               toastError(message)
           }
       })
    }
    return (
        <>
                     <div className="container">
            <div className="login">
                <div className="col form">
                <div className="svg">
                        <svg width="320" height="277" viewBox="0 0 320 277" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_d)">
                                <path d="M60.4999 66.5C111.3 -5.50002 252 -4.16668 316 5.49998V268.5H4.49994C1.99994 231.167 9.69994 138.5 60.4999 66.5Z" fill="#F5F5F5"/>
                            </g>
                            <defs>
                                <filter id="filter0_d" x="0.0878906" y="0.766602" width="319.912" height="275.733" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
                                    <feOffset dy="4"/>
                                    <feGaussianBlur stdDeviation="2"/>
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
                                </filter>
                            </defs>
                        </svg>
                    </div>
                    <div className="row">
                        <h3>Login into your account</h3>
                        <hr/>
                    </div>

                    <div className="col">
                        <form action="" onSubmit={login}>
                            <div className="row">
                                <div className="col">
                                    <input type="text" placeholder="Email" onChange={(e)=> setEmail(e.target.value)} required/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <input type="password" placeholder="Password" onChange={(e)=> setPassword(e.target.value)} required/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>   
         </div>
        </>
    )
}

LoginPage.propTypes = {

}

export default LoginPage
