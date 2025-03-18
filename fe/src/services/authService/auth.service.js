import axios from "axios";
import authTokenControl from "../../utils/authToken";
import { jwtDecode } from "jwt-decode";

const login = async (data) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/auth/login`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const datas = response.data;
    return datas;
  } catch (error) {
    return error.response.data;
  }
};

const logout = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/auth/logout`, {
      headers: {
        Authorization: `Bearer ${authTokenControl.getToken()}`,
    }});
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
  
};
const getCurrentUser = async (token) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/auth/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};



const authService = {
  login,
  logout,
  getCurrentUser,
};

export default authService;
