import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* wrapping the entire app in BrowserRouter allows react router dom features to be accessible to all components within it's context */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
