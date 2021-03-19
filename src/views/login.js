import React from "react";

class Login extends React.Component{
    
    state = {
        email: '',
        password: ''
    }
    
    render(){
        return (
            <div className="jumbotron">
                <h1 className="display-3">Seja Bem vindo ao Adapt-e!</h1>
                <p className="lead">
                    O adapt-e é um software onde alunos aprendem de forma personalizada.
                </p>
                <hr className="my-4"/>
                <div className="card">
                    <div className="card-header">
                        Login
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>E-mail*</label>
                                    <input type="text" name="email" className="form-control" value={this.state.email} required></input> 
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Senha*</label>
                                    <input type="password" name="password" className="form-control" value={this.state.password} required></input> 
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-1">
                            <button className="btn btn-success">Logar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login