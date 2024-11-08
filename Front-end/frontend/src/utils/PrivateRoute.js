// src/utils/PrivateRoute.js

import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoute({ children }) {
  const token = useSelector((state) => state.auth.token); // Utilise Redux pour vérifier le token

  if (!token) {
    console.log("Token absent ou invalide, redirection vers la page de connexion");
    return <Navigate to="/login" />; // Rediriger vers /login si pas de token
  }

  return children; // Rendre le composant enfant si le token est présent
}

export default PrivateRoute;
