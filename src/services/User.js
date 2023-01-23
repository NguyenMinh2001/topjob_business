import axios from "axios";
const baseUrl= 'http://localhost:8000/api/user';

export default class UserService {
    async SignUp(data){
        console.log(data)
     return axios.post(`/${baseUrl}/register`,data)
    }
}