import React from "react";

class CadastroUsuario extends React.Component{

    state = {
        name : '',
        email: '',
        password: '',
        c_password: ''
    }

    onChange = (event) => {
        const value = event.target.value
        const fieldName = event.target.name
        this.setState({ [fieldName]: value })
    }

    onSubmit = (event) => {
        console.log(this.state)
    }

    clearFields = (events) => {
        this.setState({ 
            name: '',
            email: '',
            password: '',
            c_password: ''
        })
    }

    render(){
        return(
            <div className="card">
                <div className="card-header">
                    Cadastro de Usuário
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Nome*</label>
                                <input type="text" name="name" className="form-control" value={this.state.name} onChange={this.onChange} required></input> 
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Email*</label>
                                <input type="email" name="email" className="form-control" value={this.state.email} onChange={this.onChange} required></input> 
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Senha*</label>
                                <input type="password" name="password" className="form-control" value={this.state.password} onChange={this.onChange} required></input> 
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Confirmar senha*</label>
                                <input type="password" name="c_password" className="form-control" value={this.state.c_password} onChange={this.onChange} required></input> 
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-1">
                           <button className="btn btn-success" onClick={this.onSubmit}>Salvar</button>
                        </div>
                        <div className="col-md-1">
                            <button className="btn btn-warning" onClick={this.clearFields}>Limpar</button> 
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default CadastroUsuario