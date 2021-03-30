import React from "react";
import axios from 'axios';


class Index extends React.Component{

    state = {
        apiResponse : undefined
    }

    componentDidMount(){

        let config = {
            headers: { Authorization: 'Bearer ' + localStorage.getItem('USER_TOKEN') }
        }

        axios.get(
            `http://localhost:8000/api/users`,
            config
        )
        .then(res => {
            this.setState({ apiResponse : res.data })
        })
        .catch(err => {
            if(err.response){
                this.setState({ apiResponse : err.response.data })
            }
        })
    }

    render(){

        if(this.state.apiResponse === undefined){
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
                        (this.state.apiResponse.message) &&
                            <div class="alert alert-dismissible alert-danger">
                                <button type="button" class="close" data-dismiss="alert">&times;</button>
                                    <strong>{this.state.apiResponse.message}</strong>
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
                                        (this.state.apiResponse.data &&
                                            this.state.apiResponse.data.map((user) => {
                                                return (
                                                        <tr>
                                                            <td>{user.name}</td>
                                                            <td>{user.email}</td>
                                                            <td>
                                                                <button type="button" className="btn btn-warning">Editar</button>
                                                                <button type="button" className="btn btn-danger">Excluir</button>
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