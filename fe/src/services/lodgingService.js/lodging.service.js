import axios from "axios";

const getAllLodging = async (params = null) => {
    try {
        const response = await axios.get("http://localhost:3000/api/lodgings", { params: params || {} });
        if (response.status === 200) {
            return response.data;
        }
        return response?.error;
    } catch (error) {
        return error.response;
    }
};
const lodgingService = {
    getAllLodging
};
export default lodgingService;
