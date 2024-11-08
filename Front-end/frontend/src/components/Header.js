import { NavLink, Link } from "react-router-dom";
import logo from "../assets/argentBankLogo.png";
import { logout } from "../store/slices/authSlice";
import { selectUserFirstName } from "../store/selectors";
import { useDispatch, useSelector } from "react-redux";


function Header() {
	const dispatch = useDispatch();
	const userFirstName = useSelector((state) => state.auth.user?.firstName);



	/**
	 * Resets the user state to null on sign out
	 */
	const signOut = () => {
		dispatch(logout());
	};

	return (
		<nav className="main-nav">
			<Link className="main-nav-logo" to="/">
				<img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
				<h1 className="sr-only">Argent Bank</h1>
			</Link>
			<div>
				{userFirstName ? (
					<>
						<NavLink className="main-nav-item" to="/profile">
							<i className="fa fa-user-circle"></i>
							{userFirstName}
						</NavLink>
						<NavLink onClick={signOut} className="main-nav-item" to="/">
							<i className="fa fa-sign-out"></i>
							Sign Out
						</NavLink>
					</>
				) : (
					<NavLink className="main-nav-item" to="/login">
						<i className="fa fa-user-circle"></i>
						Sign In
					</NavLink>
				)}
			</div>
		</nav>
	);
}

export default Header;
