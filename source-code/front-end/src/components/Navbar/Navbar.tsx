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

<<<<<<< HEAD
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
=======
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
						<Link to="/plan">Meal Plan</Link>
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
>>>>>>> ef5e4a0ec591fc053043cac237b53fedca36fa77
}

export default CustomNavbar;