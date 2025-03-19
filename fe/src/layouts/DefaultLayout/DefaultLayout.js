import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
const DefaultLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-50">
      <Header />
      </div>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
