import axios from "axios";

const apiUrl = "https://sibs-remote-work.ew.r.appspot.com";
//const apiUrl = "http://localhost:8080";

export async function requestRemoteDays(month, group) {
  console.log("Requesting: ", month, group);
  const { data } = await axios.get(`${apiUrl}/remoteDays/dosad/month`, {
    params: { month: month, group: group },
  });
  return data.remoteDays;
}
