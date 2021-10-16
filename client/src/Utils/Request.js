import axios from "axios";

const apiUrl = "http://localhost:8080";

export async function requestRemoteDays (month, group) {
    const {data} = await axios.get(`${apiUrl}/remoteWork/month`,
        {params: {month: month, group: group}});
    return data;
}