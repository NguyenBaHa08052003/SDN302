import { useEffect } from "react";
import { useUser } from "../../utils/customHook";
import { useLoading } from "../../utils/customHook";

export default function Profile() {
  const user = useUser(); 
  console.log("Profile:", user);

  return <div>Profile: {user?.data.name}</div>;
}
