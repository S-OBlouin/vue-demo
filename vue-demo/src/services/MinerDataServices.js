import axios from "axios";

const url = 'http://213.159.5.243:8081/api/'

class MinerDataServices {
    async getMiners(data){
        return await axios.get(url + 'MinerTraining/Miners', {headers: {'Authorization': `Bearer ${data}`}})
    }
    async getFeatures(data){
        return await axios.get(url + 'MinerTraining/features', {headers: {'Authorization': `Bearer ${data}`}})
    }
}

export default new MinerDataServices