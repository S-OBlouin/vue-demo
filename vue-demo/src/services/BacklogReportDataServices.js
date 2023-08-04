import axios from "axios";

const url = "http://213.159.5.243:8081/api/";

class BacklogReportDataServices {
    async getBacklogMiners(token){
        return await axios.get(url + "report/get-backlog-resut-reports-miners", { headers: { Authorization: `Bearer ${token}` } })
    }
    async getBacklogResult(data, token){
        return await axios.post(url + "report/backlog-resut-reports-listing", data, { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } })
    }
}

export default new BacklogReportDataServices();