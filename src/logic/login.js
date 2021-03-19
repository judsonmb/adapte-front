import axios from 'axios';

export default (credentials) => {
    
    axios.post(`http://localhost:8000/api/login`, credentials )
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err.response.data)
        })

}