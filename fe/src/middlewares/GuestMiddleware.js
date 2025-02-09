import { Navigate, Outlet } from "react-router-dom";
import { useLoading, useUser } from "../utils/customHook";
import withAuth from "../stores/hoc/withAuth";
function GuestMiddleware() {
  const user = useUser();
  const loading = useLoading();

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
  return user ? <Navigate to="/" /> : <Outlet />;
}

export default withAuth(GuestMiddleware);
