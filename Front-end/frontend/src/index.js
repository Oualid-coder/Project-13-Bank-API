// src/index.js

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux"; // Pour connecter Redux
import store from "./store/store"; // Import du store configuré
import AppRouter from "./AppRouter"; // Import du routeur principal de l'application
import "./main.scss"; // Import du fichier de style principal

// Création du root de l'application avec la nouvelle API de React 18
const root = ReactDOM.createRoot(document.getElementById("root"));

// On encapsule l'application dans le Provider de Redux pour que tout le store soit accessible
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </React.StrictMode>
);
