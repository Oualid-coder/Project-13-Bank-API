import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../store/slices/userSlice"; // Assurez-vous d'avoir fetchUserProfile dans userSlice
import { logout } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userProfile = useSelector((state) => state.user?.userProfile); // Utilisation de ?. pour éviter undefined
  const status = useSelector((state) => state.user?.status);
  const error = useSelector((state) => state.user?.error);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (status === "loading") return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;
  if (!userProfile) return <p>Chargement des données utilisateur...</p>; // Si le profil est encore null

  return (
    <div>
      <nav className="main-nav">
        <a className="main-nav-logo" href="/">
          <img
            className="main-nav-logo-image"
            src="./img/argentBankLogo.png"
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </a>
        <div>
          <a className="main-nav-item" href="/profile">
            <i className="fa fa-user-circle"></i>
            {userProfile.firstName}
          </a>
          <button className="main-nav-item" onClick={handleLogout}>
            <i className="fa fa-sign-out"></i>
            Sign Out
          </button>
        </div>
      </nav>
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {userProfile.firstName} {userProfile.lastName}!
          </h1>
          <button className="edit-button">Edit Name</button>
        </div>
        <h2 className="sr-only">Accounts</h2>

        {userProfile.accounts && userProfile.accounts.length > 0 ? (
          userProfile.accounts.map((account) => (
            <section key={account.id} className="account">
              <div className="account-content-wrapper">
                <h3 className="account-title">
                  {account.name} (x{account.number.slice(-4)})
                </h3>
                <p className="account-amount">${account.balance}</p>
                <p className="account-amount-description">
                  {account.description}
                </p>
              </div>
              <div className="account-content-wrapper cta">
                <button className="transaction-button">
                  View transactions
                </button>
              </div>
            </section>
          ))
        ) : (
          <p>Aucun compte trouvé pour l'utilisateur.</p>
        )}
      </main>
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </div>
  );
};

export default Profile;
