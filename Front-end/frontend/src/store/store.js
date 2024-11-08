// src/store/store.js

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer"; // Correction de l'importation

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export default store;
