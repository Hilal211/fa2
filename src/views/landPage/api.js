import axios from '@/plugins/http.service';
const axiosFunction = {
    getCollectionNft(data) {
        return axios.post("collection/get-collection", data);
    }
};
export default axiosFunction;