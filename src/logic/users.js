import axios from 'axios';

export const CreateUser = (form) => {

    let config = {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('USER_TOKEN') }
    }
    
    axios.post(
            `http://localhost:8001/api/users`, 
            form,
            config
        )
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            alert(err.response.data.message)
        })

}