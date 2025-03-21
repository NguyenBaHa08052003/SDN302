import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./stores/redux/store";
import "./index.css";
import { BrowserRouter as Router, Routes } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Router>
      <Provider store={store}>
      <App />
      </Provider>
    </Router>
  </>
);
