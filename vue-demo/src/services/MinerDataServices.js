import axios from "axios";

const url = 'http://213.159.5.243:8081/api/'

class MinerDataServices {
    async getMiners(data){
        return await axios.get(url + 'MinerTraining/Miners', {headers: {'Authorization': `Bearer ${data}`}})
    }
    async getFeatures(data){
        return await axios.get(url + 'MinerTraining/features', {headers: {'Authorization': `Bearer ${data}`}})
    }
    async getStatuses(data){
        return await axios.get(url + 'alert/statuses', {headers: {'Authorization': `Bearer ${data}`}})
    }
    async getActivities(data){
        return await axios.post(url + 'activity/run-activities', {headers: {'Authorization': `Bearer ${data.token}`}, body: {data}})
    }
    async getMinerList(data){
        return await axios.get(url + 'activity/get-miner-list', {headers: {'Authorization': `Bearer ${data}`}})
    }
    
}

export default new MinerDataServices