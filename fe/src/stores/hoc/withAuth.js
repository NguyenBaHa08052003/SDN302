import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { fetchUser } from "../redux/slices/userSlice";
import { useLoading, useUser } from "../../utils/customHook";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const loading = useLoading();
    const dispatch = useDispatch();
    const user = useUser();
    const navigate = useNavigate();
    useEffect(() => {
      if(user?.success){
        if(user?.data?.role === "Admin"){
            navigate("/dashboard");
        }
        if(user?.data?.role === "User"){
            console.log("hello User");
        }
      }
    }, [user]);
    useEffect(() => {
      const token = Cookies.get("authToken");
      if (token) {
        dispatch(fetchUser(token));
      }
    }, [dispatch]);

    if (loading) {
      return (
        <div
          style={{ zIndex: 9999, marginTop: "-50px" }}
          className="flex items-center justify-center h-screen w-screen"
        >
          <div className="flex flex-row gap-3 items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
          </div>
        </div>
      );
    }
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
