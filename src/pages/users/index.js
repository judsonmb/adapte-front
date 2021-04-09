import React from "react";
import axios from 'axios';


class Index extends React.Component{

    state = {
        getResponse : undefined,
        removeResponse : undefined
    }

    componentDidMount(){

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('USER_TOKEN')
          }

        axios.get(
            `http://localhost:8000/api/users`, {
                headers: headers
        })
        .then(res => {
            this.setState({ getResponse : res.data })
        })
        .catch(err => {
            if(err.response){
                this.setState({ getResponse : err.response.data })
            }
        })
    }

    goToUpdatePage(id){
        localStorage.setItem('SELECTED_USER', id)
        window.location.href = "/usuarios/editar"
    }

    removeUser = async (id) => {
        
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('USER_TOKEN')
        }
    
        let response = {
            success: false,
            message: ''
        }

        await axios.delete(
            `http://localhost:8000/api/users/`+id, {
                headers: headers
            })
            .then(res => {
                response.success = true
                response.message = res.data.message
                this.componentDidMount()
            })
            .catch(err => {
                response.message = err.data.message
            })
            this.setState({ removeResponse : response })
    }

    render(){

        if(this.state.getResponse === undefined){
            return(
                <div>
                    <div className="card">
                        <div className="card-header">
                            Usuários
                        </div>   
                    </div>
                    <div className="card-body">
                        <div className="spinner-border"></div>
                    </div>
                </div>
            )
        }else{
            return(
                <div>
                    {   
                        (this.state.removeResponse !== undefined && this.state.removeResponse.message && !this.state.removeResponse.success) &&
                            <div className="alert alert-dismissible alert-danger">
                                <button type="button" className="close" data-dismiss="alert">&times;</button>
                                    <strong>{this.state.removeResponse.message}</strong>
                            </div>
                    }

                    {   
                        (this.state.removeResponse !== undefined && this.state.removeResponse.message && this.state.removeResponse.success) &&
                            <div className="alert alert-dismissible alert-success">
                                <button type="button" className="close" data-dismiss="alert">&times;</button>
                                    <strong>{this.state.removeResponse.message}</strong>
                            </div>
                    }
                    <div className="card">
                        <div className="card-header">
                            Usuários
                        </div>   
                    </div>
                    <div className="card-body">
                        <div>
                            <a href="/usuarios/cadastrar/"><button type="button" className="btn btn-success">Cadastrar</button></a>
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Nome</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {   
                                        (this.state.getResponse.data &&
                                            this.state.getResponse.data.map((user) => {
                                                return (
                                                    <tr key={user.id}>
                                                        <td>{user.name}</td>
                                                        <td>{user.email}</td>
                                                        <td>
                                                            <button type="button" onClick={() => this.goToUpdatePage(user.id)} className="btn btn-warning disabled">Editar</button>
                                                            {
                                                                (parseInt(localStorage.getItem('USER_ID')) !== user.id) && 
                                                                <button type="button" onClick={() => this.removeUser(user.id)} className="btn btn-danger">Excluir</button>
                                                            }   
                                                        </td>
                                                    </tr>
                                                 )
                                            })
                                        ) 
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Index