import axios from 'axios';

export default async (credentials) => {
    let responseMessage = '';

    await axios.post(`http://localhost:8000/api/login`, credentials )
        .then(res => {
            localStorage.setItem('USER_TOKEN', res.data.data.token)
            localStorage.setItem('USER_NAME', res.data.data.name)
            console.log(localStorage.getItem('USER_NAME'))
            window.location.href = "/home";
        })
        .catch(err => {
            if(err.response){
                if(err.response.status === 422){
                    if(err.response.data.errors.email){
                        responseMessage += err.response.data.errors.email[0] + ' '
                    }
                    if(err.response.data.errors.password){
                        responseMessage += err.response.data.errors.password[0] + ' '
                    }
                }else if(err.response.status === 401){
                    responseMessage = 'E-mail e senha não conferem.'
                }else if(err.response.status === 500){
                    responseMessage = err.response.data.message
                }
            }else{
                responseMessage = 'Sistema fora do ar. Por favor, contate o suporte.'
            }
        })
    
    return responseMessage
}