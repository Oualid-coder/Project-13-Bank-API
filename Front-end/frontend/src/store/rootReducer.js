// src/store/rootReducer.js

import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"; 
import userReducer from "./slices/userSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer, // Reducer pour les informations utilisateur
});

export default rootReducer;
