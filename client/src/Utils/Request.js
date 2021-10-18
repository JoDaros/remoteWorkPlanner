import axios from "axios";

const apiUrl = "https://sibs-remote-work.ew.r.appspot.com";

export async function requestRemoteDays (month, group) {
    const {data} = await axios.get(`${apiUrl}/remoteDays/dosad/month`,
        {params: {month: month, group: group}});
    return data.remoteDays;
}