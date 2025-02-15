import axios from "axios";
import authTokenControl from "../../utils/authToken";

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
    if (datas.data) {
      authTokenControl.saveToken(datas.data.accessToken);
    }
    console.log(datas);
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
    console.log(response);
    authTokenControl.removeToken();
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

const googleLogin = async () => {
  try {
    await axios.get(`http://localhost:3000/api/auth/google`);
    // return response;
  } catch (error) {}
};

const authService = {
  login,
  logout,
  getCurrentUser,
  googleLogin,
};

export default authService;
