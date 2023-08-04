import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AdminLogin from "./AdminLogin";
import AddPost from "./AddPost";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/addpost" element={<AddPost />} />
      <Route path="/*" element={<App />} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
