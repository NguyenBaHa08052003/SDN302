import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import AuthMiddleware from "./middlewares/authMiddleware";
import HomePage from "./pages/Home/HomePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/dang-nhap" element={<Login />} />
        <Route element={<AuthMiddleware />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;