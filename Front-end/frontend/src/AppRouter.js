// src/Router.jsx

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import PrivateRoute from "./utils/PrivateRoute"; // Assure-toi que c'est correctement importé
import Header from "./components/Header";
import Footer from "./components/Footer";

function AppRouter() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            
              <Profile />
            
          }
        />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default AppRouter;
