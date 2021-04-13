import React from "react";
import axios from 'axios';
import Card from '../../components/defaultCard';


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
            process.env.REACT_APP_LINK_API+'/users', {
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
            process.env.REACT_APP_LINK_API+'/users/'+id, {
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
        return(
            <Card title="Usuários">
                {
                    this.state.getResponse === undefined && <div className="spinner-border"></div>
                }
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
                            (this.state.getResponse !== undefined && this.state.getResponse.data &&
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
            </Card>
        )
    }
}

export default Index