import React from "react";
import axios from 'axios';


class Login extends React.Component{

    state = {
        email: '',
        password: '',
        apiResponse: ''
    }

    onChange = (event) => {
        const value = event.target.value
        const fieldName = event.target.name
        this.setState({ [fieldName]: value })
    }
    
    executeLogin = async () => {

        let apiResponse = '';
        
        const credentials = {
            email: this.state.email,
            password: this.state.password
        } 

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    
        await axios.post(`http://localhost:8000/api/login`, credentials, {
                headers: headers
            })
            .then(res => {
                localStorage.setItem('USER_TOKEN', res.data.data.token)
                localStorage.setItem('USER_NAME', res.data.data.name)
                window.location.pathname = "/home"
                window.location.href = "/home"
            })
            .catch(err => {
                if(err.response){
                    if(err.response.status === 422){
                        if(err.response.data.message.email){
                            apiResponse += err.response.data.message.email[0] + ' '
                        }
                        if(err.response.data.message.password){
                            apiResponse += err.response.data.message.password[0] + ' '
                        }
                    }else{
                        apiResponse = err.response.data.message
                    }
                }else{
                    apiResponse = 'Sistema fora do ar. Por favor, contate o suporte.'
                }
            })

        this.setState({ apiResponse })
    }
    
    render(){
        return (
            <div className="jumbotron">
                <h1 className="display-4">Seja Bem vindo ao Adapt-e!</h1>
                <p className="lead">O adapt-e é um software onde alunos aprendem de forma personalizada.</p>
                <hr className="my-4"/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card" >
                               
                                {this.state.apiResponse !== '' &&
                                    <div className="alert alert-dismissible alert-danger">
                                        <button type="button" className="close" data-dismiss="alert">&times;</button>
                                        <strong>{this.state.apiResponse}</strong>
                                    </div>
                                }

                                <div className="card-header">
                                    Login
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label>E-mail*</label>
                                                <input type="text" name="email" className="form-control" value={this.state.email} onChange={this.onChange} required></input> 
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label>Senha*</label>
                                                <input type="password" name="password" className="form-control" value={this.state.password} onChange={this.onChange} required></input> 
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-1">
                                            <button type="submit" className="btn btn-success" onClick={this.executeLogin}>Logar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login