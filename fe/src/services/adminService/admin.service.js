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

const addUser = async (newUser, token) => {
    try {
        const response = await axios.post(`http://localhost:3000/api/admin/addUser`, newUser, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response;
    }
}

const updateUser = async (id, data, token) => {
    try {
        const response = await axios.put(`http://localhost:3000/api/admin/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response;
    }
}

const verifyAccount = async (id) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/admin/verify-account/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);

    }
}

const getAllRole = async (token) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/admin/role/getAll`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response;
    }
};

export { getAllUsers, getAllRole, verifyAccount, addUser, updateUser }