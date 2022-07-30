import axios from '@/plugins/http.service';
const axiosFunction = {
    getAllBrands() {
        return axios.get("brand/getall");
    },
    
    getMasters() {
        return axios.get("category/master");
    },
    getCategory(data) {
        return axios.post("category/categories",data);
    },
 
};
export default axiosFunction;