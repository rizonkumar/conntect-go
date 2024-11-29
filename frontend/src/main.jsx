import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import UserContextProvider from "./context/userContext.jsx";
import CaptainContextProvider from "./context/CaptainContext.jsx";

createRoot(document.getElementById("root")).render(
  <CaptainContextProvider>
    <UserContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserContextProvider>
  </CaptainContextProvider>
);
