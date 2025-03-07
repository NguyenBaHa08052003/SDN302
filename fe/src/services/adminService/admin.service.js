import axios from "axios";

const getAllUsers = async (token) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/admin`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response;
    }
};

export { getAllUsers }