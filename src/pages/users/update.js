import React, { useEffect, useState } from "react";
import axios from 'axios';
import Card from '../../components/defaultCard';


function UpdateUser(){

    const [ id, setId ] = useState(0)
    const [ name, setName ] = useState('')
    const [ apiResponse, setApiResponse] = useState('')
    const [ errorMessage, setErrorMessage] = useState('')

    useEffect(() => {

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('USER_TOKEN')
          }

        axios.get(
            process.env.REACT_APP_LINK_API+'/users/'+localStorage.getItem('SELECTED_USER')+`/edit`, {
                headers: headers
        })
        .then(res => {
            setApiResponse(res.data.data)
            setName(res.data.data.name)

        })
        .catch(err => {
            if(err.apiUpdateResponse){
                setApiResponse(err.apiUpdateResponse.data)
            }
        })
    
    }, [])

    const updateUser = async (event) => {

        event.preventDefault();

        const form = {
            name: name,
        }
        
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('USER_TOKEN')
        }

        await axios.put(
            process.env.REACT_APP_LINK_API+'/users/'+localStorage.getItem('SELECTED_USER'), form, {
                headers: headers
            })
            .then(res => {
                window.location.href = "/usuarios"
            })
            .catch(err => {
                let message = ''
                if(err.response){
                    if(err.response.status === 422){
                        if(err.response.data.message.name){
                            message += err.response.data.message.name[0] + ' '
                        }
                    }else if(err.response.status === 500){
                        message = err.response.data.message
                    }
                }
                setErrorMessage(message)
            })
    }

    const clearFields = () => {
        setName('')
    }

    return(
        <Card title="Edição de Usuário">
            { 
                apiResponse === '' && <div className="spinner-border"></div> 
            }
            {
                errorMessage !== '' &&
                <div className="alert alert-dismissible alert-danger">
                    <button type="button" className="close" data-dismiss="alert">&times;</button>
                    <strong>{errorMessage}</strong>
                </div>
            }
            { 
                apiResponse !== '' &&
                <form id="updateUserForm" onSubmit={updateUser}>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label>Nome*</label>
                                <input type="text" name="name" className="form-control" value={name} onChange={e => setName(e.target.value)} required></input> 
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-1">
                            <button type="submit" className="btn btn-success">Salvar</button>
                        </div>
                        <div className="col-md-1">
                            <button className="btn btn-warning" onClick={clearFields}>Limpar</button> 
                        </div>
                    </div>
                </form>
            }
        </Card>
    )
}

export default UpdateUser