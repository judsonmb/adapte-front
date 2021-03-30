import React from "react";
import axios from 'axios';


class CreateUser extends React.Component{

    state = {
        name : '',
        email: '',
        password: '',
        c_password: '',
        apiResponse: undefined
    }

    onChange = (event) => {
        const value = event.target.value
        const fieldName = event.target.name
        this.setState({ [fieldName]: value })
    }

    onSubmit = async () => {

        const form = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            c_password: this.state.c_password
        } 

        console.log(form)

        let config = {
            headers: { Authorization: 'Bearer ' + localStorage.getItem('USER_TOKEN') }
        }
    
        let response = {
            success: false,
            message: ''
        }
        
        await axios.post(
                `http://localhost:8000/api/users`, 
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
                        if(err.response.data.errors.name){
                            response.message += err.response.data.errors.name[0] + ' '
                        }
                        if(err.response.data.errors.email){
                            response.message += err.response.data.errors.email[0] + ' '
                        }
                        if(err.response.data.errors.password){
                            response.message += err.response.data.errors.password[0] + ' '
                        }
                        if(err.response.data.errors.c_password){
                            response.message += err.response.data.errors.c_password[0] + ' '
                        }
                    }else if(err.response.status === 500){
                        response.message = err.response.data.message
                    }
                }
            })
        
        this.setState({ apiResponse: response })
    }

    clearFields = () => {
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
                
                {this.state.apiResponse !== undefined && !this.state.apiResponse.success &&
                    <div className="alert alert-dismissible alert-danger">
                        <button type="button" className="close" data-dismiss="alert">&times;</button>
                        <strong>{this.state.apiResponse.message}</strong>
                    </div>
                }

                {this.state.apiResponse !== undefined && this.state.apiResponse.success &&
                    <div className="alert alert-dismissible alert-success">
                        <button type="button" className="close" data-dismiss="alert">&times;</button>
                        <strong>{this.state.apiResponse.message}</strong>
                    </div>
                }

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

export default CreateUser