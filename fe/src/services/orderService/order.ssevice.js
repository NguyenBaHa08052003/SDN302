import axios from "axios";

const getAllOrders = async (token) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/orders`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response;
    }
};

export { getAllOrders };