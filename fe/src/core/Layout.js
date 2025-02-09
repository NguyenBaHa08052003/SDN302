import { Routes } from "react-router-dom";
import { publicRoutes } from "../routers/publicRoutes";
import { privateRoutes } from "../routers/privateRoutes";


const Layout = () => {
  return (
    <div>
      <Routes>
        {publicRoutes}
        {privateRoutes}
      </Routes>
    </div>
  );
};

export default Layout;
