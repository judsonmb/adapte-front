import axios from 'axios';

export async function CreateUser(form) {

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
            response.message = 'Usuário cadastrado com sucesso!!';
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
                    response.message = 'Erro interno no servidor. Por favor, contate o suporte.'
                }
            }else{
                response.message = 'Sistema fora do ar. Por favor, contate o suporte.'
            }
        })
    
    return response
}