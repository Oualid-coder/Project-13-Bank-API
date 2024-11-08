import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../store/slices/authSlice"; // Importer loginUser

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginStatus = useSelector((state) => state.auth.status);
  const loginError = useSelector((state) => state.auth.error);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Tentative de connexion avec:", { email, password });

    try {
      await dispatch(loginUser({ email, password })).unwrap();
      console.log("Connexion réussie, redirection vers la page de profil.");
      navigate("/profile"); // Redirection si le login est réussi
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
      {loginStatus === "loading" && <p>Chargement...</p>}
      {loginError && <p>{loginError}</p>}
    </div>
  );
};

export default Login;
