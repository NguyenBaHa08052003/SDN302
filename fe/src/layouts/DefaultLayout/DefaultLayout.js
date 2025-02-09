import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
const DefaultLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
