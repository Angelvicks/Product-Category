import React, {useEffect, useState} from 'react';
import Spinner from '../components/spinner.component';
import '../styles/results.style.scss'
import { getLocalStorage } from '../utils/core';
import { makeRequest} from '../utils/makerequest';
import { toastError } from '../utils/toastr';

const ResultsPage = () => {
    const [loading, setLoading] = useState(true)
    const [result, setResult] = useState(null)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 300);

        const filepath = getLocalStorage('filepath')


        const userinfo = getLocalStorage('user-info');

        const data = {
            "filepath":filepath, 'user_id': userinfo.id
        }

        makeRequest('/prediction',"post", data).then(({data:{message, response, success}}) => {
            if(success){
                console.log(response)
                setResult(response)
            }else{
                    toastError(message)
            }
        })
        

    }, [])
    if (loading){
        return <Spinner/> 
    }
    return (
        <>
        <div className="container"> 
         <div className="results">
            <div className="Results">
                <h3> Model Results</h3>
                {/* <img src="/imag.png" alt="images" />
                <h5>The Model Predicted</h5>
                <div className="Class">
                      <h4>Class-1787</h4>
                      <div className="Product">
                          <h6>As Product Category</h6>
                      </div>

                </div> */}
                </div>
                
                <div className= "Results History">
                    <div className="Table">
                        <div className="row">
                            {
                                !result?<h1>No Results, Make Prediction</h1>:
                                <table>
                    <thead>
                    <tr>
                                        {
                                            result.head.map(h => (
                                            <th key={h}>{h}</th>
                                            ))
                                        }
                                        </tr>
                                        
                                        </thead>
                                    
                                        <tbody>
                                            {
                                               result.body.map(body => (
                                                <tr>
                                                    {body.map(b => (
                                                        <td key={b}>{b}</td>
                                                    ))}
                                                </tr>
                                                
                                                    )) 

                                                    
                                            }
                        </tbody>
                        
                       </table>
                            }

                    </div>

                    <div className="row">
                        <div className="col-2">
                            <p>1/5</p>
                        </div>
                        <div className="col-9">
                            <div className="row content">
                                <div className="col-2">
                                    <button className="btn btn-primary">back</button>
                                </div>
                                <div className="col-2">
                                    <button className="btn btn-primary">next</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                    
               </div>
            </div>
    </>
    )}
export default ResultsPage;