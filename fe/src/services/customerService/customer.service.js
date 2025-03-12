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

export { updateUserr, getInforUser }