import React, { useState } from 'react';
import axios from 'axios';
import Card from '../../components/defaultCard';


function CreateUser(){

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [c_password, setCPassword] = useState('')
    const [apiResponse, setApiResponse] = useState('')

    const createUser = async (event) => {

        event.preventDefault();

        const form = {
            name: name,
            email: email,
            password: password,
            c_password: c_password
        } 

        let config = {
            headers: { Authorization: 'Bearer ' + localStorage.getItem('USER_TOKEN') }
        }
    
        let response = {
            success: false,
            message: ''
        }
        
        await axios.post(
            process.env.REACT_APP_LINK_API+'/users', 
                form,
                config
            )
            .then(res => {
                response.success = true;
                response.message = res.data.message;
            })
            .catch(err => {
                if(err.response){
                    if(err.response.status === 422){
                        if(err.response.data.message.name){
                            response.message += err.response.data.message.name[0]
                        }
                        if(err.response.data.message.email){
                            response.message += err.response.data.message.email[0] 
                        }
                        if(err.response.data.message.password){
                            response.message += err.response.data.message.password[0]
                        }
                        if(err.response.data.message.c_password){
                            response.message += err.response.data.message.c_password[0]
                        }
                    }else if(err.response.status === 500){
                        response.message = err.response.data.message
                    }
                }
            })
        
        setApiResponse(response)
    }

    const clearFields = () => {
        setName('')
        setEmail('')
        setPassword('')
        setCPassword('')
    }

    return(
        <Card title='Cadastro de Usuário'>
            {
                apiResponse !== '' && !apiResponse.success &&
                <div className="alert alert-dismissible alert-danger">
                    <button type="button" className="close" data-dismiss="alert">&times;</button>
                    <strong>{apiResponse.message}</strong>
                </div>
            }
            {
                apiResponse !== '' && apiResponse.success &&
                <div className="alert alert-dismissible alert-success">
                    <button type="button" className="close" data-dismiss="alert">&times;</button>
                    <strong>{apiResponse.message}</strong>
                </div>
            }
            <form id="createUserForm" onSubmit={createUser}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Nome*</label>
                            <input type="text" name="name" className="form-control" value={name} onChange={e => setName(e.target.value)} required></input> 
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Email*</label>
                            <input type="email" name="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required></input> 
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Senha*</label>
                            <input type="password" name="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required></input> 
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Confirmar senha*</label>
                            <input type="password" name="c_password" className="form-control" value={c_password} onChange={e => setCPassword(e.target.value)} required></input> 
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
        </Card>
    )
}

export default CreateUser