import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import jwtToken from "../utils/jwtToken";
import Cookies from "js-cookie";
import authTokenControl from "../utils/authToken";

function AuthMiddleware() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = Cookies.get("authToken");

    if (token) {
      if (jwtToken.isTokenExpired(token)) {

        authTokenControl.removeToken();
        navigate("/dang-nhap");
      } else {
        console.log("Token còn hiệu lực.");
        navigate("/"); 
      }
    } else {
      authTokenControl.removeToken();
      navigate("/dang-nhap");
    }
  }, [navigate]);

  return <Outlet />;
}

export default AuthMiddleware;
