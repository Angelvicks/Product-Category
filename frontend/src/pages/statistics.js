import React, {useEffect, useState} from 'react';
import Spinner from '../components/spinner.component';

import'../styles/about.style.scss'


const Statistics = () => {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 300);
    }, [])
    if (loading){
        return <Spinner/> 
    }
    return <>
        <h2>Statistics page</h2>
    </>
}

export default Statistics;