import axios from 'axios';

export default (credentials) => {
    
    axios.post(`http://localhost:8001/api/login`, credentials )
        .then(res => {
            localStorage.setItem('USER_TOKEN', res.data.data.token)
            localStorage.setItem('USER_NAME', res.data.data.name)
            console.log(localStorage.getItem('USER_NAME'))
            window.location.href = "/home";
        })
        .catch(err => {
            alert(err.response.data.message)
        })

}