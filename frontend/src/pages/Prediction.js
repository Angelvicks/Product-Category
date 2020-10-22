import React, {useEffect, useState} from 'react';
import Spinner from '../components/spinner.component';
import { setLocalStorage } from '../utils/core';
import { makeRequest} from '../utils/makerequest';
import { toastError } from '../utils/toastr';
import '../styles/prediction.style.scss'

const PredictionPage = ({history}) => {
    const [loading, setLoading] = useState(true)
    const [description, setDescription] = useState(null)
    const [fileName, setFileName] = useState('choose file')
    const [filepath, setFilepath] = useState(null)
    const [file, setFile] = useState(null)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 300);
    }, [])

    const makePrediction = (e) => {
        e.preventDefault()
        if(!filepath){
            toastError('Please upload File')
            return
        }
        setLocalStorage('filepath', filepath)
        history.push("/dashboard/results")
    }

    const handleUpload = (e) => {
        e.preventDefault()
        setFileName(e.target.files[0].name)
        setFile(e.target.files[0])
    }

    const uploadFile = () => {

        if(!file){
            toastError('Please Select File, No file uploaded')
            return
        }

            const formData = new FormData()
            formData.append('file', file, fileName)

            makeRequest('/upload',"post", formData).then(({data:{message, response, success}}) => {
                if(success){
                    setFilepath(response.filename)
                    setDescription(response)
                }else{
                        toastError(message)
                }
            })
    }

    const selectFile = () => {
        document.getElementById('selectFile').click()

    }

    if (loading){
        return <Spinner/> 
    }

    return (
        <>
        <div className="container predictions">
                <div className="row">
                    <h3> upload a Sample Invoice file for Prediction</h3>
                </div>
                <div className="row">
                    <form className="form" onSubmit={makePrediction}>
                        <div className="row">
                            <div className="col-3">
                                <span className='span'>
                                <button className="btn btn-primary" type="button" onClick={selectFile}>select file</button>
                                <button className="btn btn-primary" type="button" onClick={uploadFile}>upload csv</button>
                                </span>
                                {/* <img src="/imag.png" alt="images" /> */}
                                <input type="file" hidden id='selectFile' onChange={handleUpload}/>

                                 <p>{fileName}</p>
                            </div>
                            <div className="col-9">
                                {!description? <div className='description'> <h5>csv preview here</h5></div>:
                                <div className='description'> 
                                <table className='desc'>
                                    <thead>
                                        
                                        <tr>
                                        {
                                            description.head.map(h => (
                                            <th key={h}>{h}</th>
                                            ))
                                        }
                                        </tr>
                                        
                                        </thead>
                                    
                                        <tbody>
                                            {
                                               description.body.map(body => (
                                                <tr>
                                                    {body.map(b => (
                                                        <td key={b}>{b}</td>
                                                    ))}
                                                </tr>
                                                
                                                    )) 

                                                    
                                            }
                                            
                                                
                                        </tbody>
                                        
                                    </table>
                                </div>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3">
                            </div>
                            <div className="col-9">
                                <button className="btn btn-primary" type="submit">Make Prediction</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        
         </>
    )
}

PredictionPage.propTypes = {

}

export default PredictionPage
