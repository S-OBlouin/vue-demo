import axios from "axios";

const url = "http://213.159.5.243:8081/api/";

class MinerDataServices {
  async getMiners(token) {
    return await axios.get(url + "MinerTraining/Miners", { headers: { Authorization: `Bearer ${token}` } });
  }
  async getFeatures(token) {
    return await axios.get(url + "MinerTraining/features", { headers: { Authorization: `Bearer ${token}` } });
  }
  async getStatuses(token) {
    return await axios.get(url + "alert/statuses", { headers: { Authorization: `Bearer ${token}` } });
  }
  async getActivities(data, token) {
    return await axios.post(url + "activity/run-activities", data,{ headers:{ Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'}});
  }
  async getMinerList(token) {
    return await axios.get(url + "activity/get-miner-list", { headers: { Authorization: `Bearer ${token}` } });
  }
}

export default new MinerDataServices();
