import React, {useEffect, useState} from 'react';
import Spinner from '../components/spinner.component';
import {toastSuccess, toastError} from '../utils/toastr';
import {makeRequest} from '../utils/makerequest';
import {setLocalStorage} from '../utils/core';

import '../styles/signup.style.scss'

const SignupPage = ({history}) => {
    const [loading, setLoading] = useState(true)
    const [fullName, setName] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('')
    const [country, setCountry] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCPassword] = useState('')

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 300);
    }, [])

    const signup = async(e) => {
        e.preventDefault()
        if(password !== cpassword){
            toastError('Password Does not match')
            return
        }

        const data={
            fullName, email, gender, password, cpassword, country 
        }

        await makeRequest('/register', 'post', data).then(({data : {message, success, response}}) => {
            console.log(message, data, success)
            if(success){
             setLocalStorage('user-info', response)
             console.log(history)
             history.push('/dashboard')
            window.location.reload()
             toastSuccess(message)
            }else{
                toastError(message)
            }
        })
    }
    if (loading){
        return <Spinner/> 
    }
    return (
        <>
         <div className="container">
            <div className="signup">
                <div className="col form">
                    <div className="svg">
                        <svg width="255" height="444" viewBox="0 0 255 444" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M190.095 86.9053L18.8068 1.38934C10.1636 -2.92582 0 3.35982 0 13.0204V430.546C0 440.31 10.3199 446.554 18.8274 441.762C87.2926 403.201 203.95 324.136 240.995 247.663C281.714 163.604 224.028 105.467 190.095 86.9053Z" fill="#F5F5F5"/>
                        </svg>
                    </div>
                    <div className="row">
                        <h3>Create An Account</h3>
                        <hr/>
                    </div>

                    <div className="col">
                        <form action="" onSubmit={signup}>

                            <div className="row">
                                <div className="col">
                                    <input type="text" placeholder="Full Names" onChange={(e)=>{setName(e.target.value)}} required/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <input type="email" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}} required/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <input type="text" placeholder="Gender" onChange={(e)=>{setGender(e.target.value)}} required/>
                                </div>
                                <div className="col-6">
                                    <input type="text" placeholder="Country" onChange={(e)=>{setCountry(e.target.value)}} required/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <input type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} required/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <input type="password" placeholder="Comfirm Password" onChange={(e)=>{setCPassword(e.target.value)}} required/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <button type="submit" className="btn btn-primary" >Signup</button>
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

SignupPage.propTypes = {

}

export default SignupPage
