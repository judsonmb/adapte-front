import axios from 'axios';

export default async (credentials) => {
    let errorMessage = '';

    await axios.post(`http://localhost:8001/api/login`, credentials )
        .then(res => {
            localStorage.setItem('USER_TOKEN', res.data.data.token)
            localStorage.setItem('USER_NAME', res.data.data.name)
            console.log(localStorage.getItem('USER_NAME'))
            window.location.href = "/home";
        })
        .catch(err => {
            if(err.response.status === 422){
                if(err.response.data.errors.email){
                    errorMessage += err.response.data.errors.email[0] + ' '
                }
                if(err.response.data.errors.password){
                    errorMessage += err.response.data.errors.password[0] + ' '
                }
            }else if(err.response.status === 401){
                errorMessage = 'E-mail e senha não conferem.'
            }else if(err.response.status === 500){
                errorMessage = 'Erro interno no servidor. Por favor, contate o suporte.'
            }
        })
    
    return errorMessage
}