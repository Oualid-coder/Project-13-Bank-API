// src/store/selectors.js

// Sélecteurs pour l'utilisateur
export const selectUser = (state) => state.auth.user;
export const selectUserToken = (state) => state.auth.token;

// Sélecteurs pour l'authentification
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;


export const selectUserFirstName = (state) => state.user?.firstName;
export const selectUserLastName = (state) => state.user?.lastName;
export const selectUserEmail = (state) => state.user?.email;