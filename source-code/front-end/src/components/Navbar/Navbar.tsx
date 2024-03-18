import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "../../store/store";
import { userActions } from "../../store/slices/userSlice";
// export type CleanedRootState = Omit<RootState, "_persist">;
import './Navbar.css';

function Navbar() {
	const userState = useSelector((state: any) => state.user); // Access the user state from the global state
	//   console.log(userState); // Log the current user state
	const dispatch = useDispatch(); // Get the dispatch function
	const navigate = useNavigate();


	if (!userState) {
		dispatch(
			userActions.loginUser({ username: "defaultUsername", isLoggedIn: false })
		);
	}

	let userPathParam = userState.username;
	//   console.log(userPathParam);

	const handleLogout = () => {
		// Dispatch the action to update the user state when the "Logout" link is clicked
		dispatch(userActions.logoutUser());
		navigate("/")
	};

	return (
		<nav>
			<Link to="/">MeaningFul Meals</Link>
			{userState.isLoggedIn === true ? (
				<ul>
					<li>
						<Link to="/profile">Profile</Link>
					</li>
					<li>
						<Link to={`/recipes/user-recipes/${userPathParam}`}>Recipes</Link>
					</li>
					<li>
						<Link to="/plan">Meal Plans</Link>
					</li>
					<li>
						<Link to='/search'>Search Recipes</Link>
					</li>

					<li>
						<button onClick={handleLogout}>Logout</button>
					</li>
				</ul>
			) : (
				<ul>
					<li>
						<Link to="/login">Login</Link>
					</li>
					<li>
						<Link to="/register">Register</Link>
					</li>
				</ul>
			)}
		</nav>
	);
}

export default Navbar;
