import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function LodgingPage() {
    const error = useSelector((state) => state.userRedux.error);
    console.log("User data:", error); // Kiểm tra dữ liệu Redux
    useEffect(() => {

    }, [error]);
    return <div>{error  }</div>;
  }
  