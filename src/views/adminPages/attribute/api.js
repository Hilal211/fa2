import axios from '@/plugins/http.service';
const axiosFunction = {
    getAllAttributes() {
        return axios.get("attribute/all");
    },
 
};
export default axiosFunction;