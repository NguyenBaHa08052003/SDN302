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
    return datas;
  } catch (error) {
    return false;
  }
};

const logout = () => {
  localStorage.removeItem("authToken");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("authToken"));
};

const googleLogin = async (data) => {
  try {
    
  } catch (error) {}
};

const authService = {
  login,
  logout,
  getCurrentUser,
  googleLogin,
};

export default authService;
