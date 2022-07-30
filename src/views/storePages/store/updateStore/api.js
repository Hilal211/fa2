import axios from '@/plugins/http.service';
const axiosFunction = {
    getAllBrands() {
        return axios.get("brand/getall");
    },
    getProducts(data) {
        return axios.post("product/getall",data);
    },
    getMasters() {
        return axios.get("category/master");
    },
    getCategory(data) {
        return axios.post("category/categories",data);
    },
 
};
export default axiosFunction;