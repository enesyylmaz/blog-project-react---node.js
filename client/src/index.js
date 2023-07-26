import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);

ReactDOM.createRoot(el).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

reportWebVitals();
