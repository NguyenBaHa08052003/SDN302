import axios from "axios"

const updateUserr = async (id, data, token) => {
    try {
        const response = await axios.put(`http://localhost:3000/api/users/update/${id}`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            }
        })
        console.log(response);

        return response.data
    } catch (error) {
        return error.response;
    }
}

const getInforUser = async (idCus, token) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/users/update/${idCus}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })

        return response.data;
    } catch (error) {
        return error.response;
    }
}

const getFavoriteLodging = async (id, token) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/users/favorite/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        return response.data;
    } catch (error) {
        return error.response;
    }
}

const addFavoriteLodging = async (id, lodgingId, token) => {
    try {
        const response = await axios.post(`http://localhost:3000/api/users/favorite/${id}`, { lodgingId: lodgingId }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        return response.data;
    } catch (error) {
        return error.response;
    }
}
export { updateUserr, getInforUser, addFavoriteLodging, getFavoriteLodging }