import React, {useEffect, useState} from 'react';
import Spinner from '../components/spinner.component';
const PageNotFound = () => {
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
        <div>
            <h2>PageNotFound</h2>
        </div>
    )
}

export default PageNotFound
