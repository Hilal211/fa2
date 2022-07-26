import axios from '@/plugins/http.service';
const axiosFunction = {
    getAllBrands() {
        return axios.get("brand/getall");
    },
    getAllActivities() {
        return axios.get("activity/getall");
    },
    submit(data) {
        return axios.post("business-request/add", data
         );
    }
};
export default axiosFunction;