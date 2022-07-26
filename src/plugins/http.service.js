import axios from "axios";
let API_ENDPOINT = "http://localhost:5000/";   /// local
const HOSTURL = "http://localhost/";
let config = {
  baseURL: `${API_ENDPOINT}`,
  // headers: {'Content-Type': 'application/json'}
  
};
const httpClient = axios.create(config);
export { HOSTURL };
export { API_ENDPOINT };
export default httpClient;