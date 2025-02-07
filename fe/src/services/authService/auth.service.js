import axios from "axios";


const login = async (email, password) => {
    const response = await axios.post(
        `http://localhost:3000/api/auth/login`, 
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
  if (response.data.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
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
