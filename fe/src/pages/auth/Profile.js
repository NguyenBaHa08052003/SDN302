import { useEffect } from "react";
import { useError, useUser } from "../../utils/customHook";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
export default function Profile() {
  const user = useUser();
  useEffect(() => {
    if(Cookies.get("authToken") && user?.success) {
        toast.success(`Chào mừng bạn trở lại ${user.data.name}`);
    };
  }, [])
  console.log("Profile:", user);

  return <div>
    <ToastContainer/>
    Profile: {user?.data.name}</div>;
}
