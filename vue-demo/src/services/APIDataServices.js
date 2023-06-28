import axios from 'axios'

const url = 'http://213.159.5.243:8081/api/'

class APIDataServices {
    async getRoles(data) {
        return await axios.get(url + 'account/get-roles', {headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${data}`}})
    }
    async getCompanies(){
        return axios.get(url + 'SubCompany/get-company-list')
    }
    async login(data){
        return axios.post(url + 'account/login', data)
    }
    async getButtonVisibility(data){
        return axios.get(url + 'account/get-button-visibility', {headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${data}`}})
    }
}

export default new APIDataServices