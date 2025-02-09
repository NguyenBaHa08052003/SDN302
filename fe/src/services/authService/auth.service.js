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

const logout = () => {
  authTokenControl.removeToken();
};
const getCurrentUser =async (token) => {
   try {
      const response = await axios.get(`http://localhost:3000/api/auth/users`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      });
      return response;
   } catch (error) {

   }  
};

const googleLogin = async (data) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/auth/google`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    return response;
  } catch (error) {}
};

const authService = {
  login,
  logout,
  getCurrentUser,
  googleLogin,
};

export default authService;
