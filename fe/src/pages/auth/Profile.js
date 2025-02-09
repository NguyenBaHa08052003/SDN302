import { useEffect } from "react";
import { useError, useUser } from "../../utils/customHook";
import Cookies from "js-cookie";
export default function Profile() {
  const user = useUser();

  console.log("Profile:", user);

  return <div>Profile: {user?.data.name}</div>;
}
