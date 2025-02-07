import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/dang-nhap" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
