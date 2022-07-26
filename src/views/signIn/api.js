import axios from '@/plugins/http.service';
const axiosFunction = {
    login(data) {
        return axios.post("user/login", data);
    }
};
export default axiosFunction;