import { jwtDecode } from "jwt-decode";

const isTokenExpired = (token) => {
  try {
    if (!token) return true;
    const decoded = jwtDecode(token);
    console.log(decoded);
    if (!decoded || !decoded.exp) return true;
    return decoded.exp * 1000 < new Date().getTime(); 
  } catch (error) {
    return true; 
  }
};

const jwtToken = {
  isTokenExpired,
};
export default jwtToken;
