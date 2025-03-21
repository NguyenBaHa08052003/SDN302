import axios from "axios";
import authTokenControl from "../../utils/authToken";

const getAllLodging = async (params = null) => {
  console.log(params);
  
  try {
    const response = await axios.get("http://localhost:3000/api/lodgings", {
      params: params || {},
    });
    if (response.status === 200) {
      return response.data;
    }
    return response?.error;
  } catch (error) {
    return error.response;
  }
};

const createLodging = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/lodgings",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authTokenControl.getToken()}`,
        },
      }
    );
    if (response.status === 201) {
      return response.data;
    }
    return response?.error;
  } catch (error) {
    return error.response;
  }
};
const updateLodging = async (id, data) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/api/lodgings/${id}/lodging`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authTokenControl.getToken()}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
    return response?.error;
  } catch (error) {
    return error.response;
  }
}
const lodgingService = {
  getAllLodging,
  createLodging,
  updateLodging
};
export default lodgingService;
