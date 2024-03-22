import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../store/slices/userSlice";
import { Navbar, Nav, Button } from 'react-bootstrap';
import './Navbar.css';

function CustomNavbar() {
	const userState = useSelector((state: any) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (!userState) {
			dispatch(userActions.loginUser({ username: "defaultUsername", isLoggedIn: false }));
		}
	}, [dispatch, userState]);

	const handleLogout = () => {
		dispatch(userActions.logoutUser());
		navigate("/");
	};

	return (
		<Navbar bg="light" expand="lg">
			<Navbar.Brand className="navbar-brand" as={Link} to="/">MeaningFul Meals</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="custom-navbar">
					{userState.isLoggedIn ? (
						<>
							<Nav.Link as={Link} to="/profile">Profile</Nav.Link>
							<Nav.Link as={Link} to={`/recipes/user-recipes/${userState.username}`}>Recipes</Nav.Link>
							<Nav.Link as={Link} to="/plan">Meal Plan</Nav.Link>
							<Nav.Link as={Link} to="/search">Search Recipes</Nav.Link>
							<Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
						</>
					) : (
						<>
							<Nav.Link as={Link} to="/login">Login</Nav.Link>
							<Nav.Link as={Link} to="/register">Register</Nav.Link>
						</>
					)}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}

export default CustomNavbar;