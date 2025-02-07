import axios from "axios";


const login = async (data) => {
    const response = await axios.post(
        `http://localhost:3000/api/auth/login`, 
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
    const datas = response.data;
  if (datas.data) {
    localStorage.setItem("token", JSON.stringify(datas.data.accessToken));
  }
  return datas;
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  login,
  logout,
  getCurrentUser,
};

export default authService;
