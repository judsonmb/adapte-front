import React from "react";

import ExecuteLogin from '../logic/login';

class Login extends React.Component{

    state = {
        email: '',
        password: '',
        errorMessage: ''
    }

    onChange = (event) => {
        const value = event.target.value
        const fieldName = event.target.name
        this.setState({ [fieldName]: value })
    }
    
    executeLogin = async () => {
        const credentials = {
            email: this.state.email,
            password: this.state.password
        } 

        this.setState({ errorMessage: await ExecuteLogin(credentials)})
    }
    
    render(){
        return (
            <div className="jumbotron">
                <h1 className="display-3">Seja Bem vindo ao Adapt-e!</h1>
                <p className="lead">O adapt-e é um software onde alunos aprendem de forma personalizada.</p>
                <hr className="my-4"/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card" >
                               
                                {this.state.errorMessage !== '' &&
                                    <div className="alert alert-dismissible alert-danger">
                                        <button type="button" className="close" data-dismiss="alert">&times;</button>
                                        <strong>{this.state.errorMessage}</strong>
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