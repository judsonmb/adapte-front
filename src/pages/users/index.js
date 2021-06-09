import React, { useEffect, useState } from "react";
import axios from 'axios';
import Card from '../../components/defaultCard';


function Index(){

    const [ listResponse, setListResponse ] = useState(undefined)
    const [ removeResponse, setRemoveResponse ] = useState(undefined)

    useEffect(() => {

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
            setListResponse(res.data)
        })
        .catch(err => {
            if(err.response){
                setListResponse(err.response.data)
            }
        })

    }, [])

    const goToUpdatePage = (id) => {
        localStorage.setItem('SELECTED_USER', id)
        window.location.href = "/usuarios/editar"
    }

    const removeUser = async (id) => {
        
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
            setRemoveResponse(response)
    }

    return(
        <Card title="Usuários">
            {
                listResponse === undefined && <div className="spinner-border"></div>
            }
            {   
                (removeResponse !== undefined && removeResponse.message && !removeResponse.success) &&
                    <div className="alert alert-dismissible alert-danger">
                        <button type="button" className="close" data-dismiss="alert">&times;</button>
                            <strong>{removeResponse.message}</strong>
                    </div>
            }
            {   
                (removeResponse !== undefined && removeResponse.message && removeResponse.success) &&
                    <div className="alert alert-dismissible alert-success">
                        <button type="button" className="close" data-dismiss="alert">&times;</button>
                            <strong>{removeResponse.message}</strong>
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
                        (listResponse !== undefined && listResponse.data &&
                            listResponse.data.map((user) => {
                                return (
                                    <tr key={user.id}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <button type="button" onClick={() => goToUpdatePage(user.id)} className="btn btn-warning disabled">Editar</button>
                                            {
                                                (parseInt(localStorage.getItem('USER_ID')) !== user.id) && 
                                                <button type="button" onClick={() => removeUser(user.id)} className="btn btn-danger">Excluir</button>
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

export default Index