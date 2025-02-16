import axios from "axios";

const getAllLodging = async () => {
    console.log("hello");
    
    try {
    //     const response = await axios.get('https://esgoo.net/api-tinhthanh/1/0.htm');
    //    if(response.status === 200){
    //     return response.data;
    //    }
    //    return response;
    const response = await axios.get(`https://fakestoreapi.com/products`);
    if(response.status === 200){
        return response.data;
    }
    return response?.error
    } catch (error) {
        return error.response;
    }
}
const lodgingService = {
    getAllLodging
};
export default lodgingService;