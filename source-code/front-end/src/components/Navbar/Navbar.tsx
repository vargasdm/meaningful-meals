import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

// will change this when I use bootstrap
import "./Navbar.css";

function Navbar() {
  const userState = useSelector((state: RootState) => state.user); // Access the user state from the global state

  console.log(userState); // Log the current user state

  // creates global state variable for use as a path param 
  let userPathParam = userState.username
  console.log(userPathParam);
  

  return (
    <nav>
      <Link to="/">MeaningFul Meals</Link>
      {userState?.username && userState?.password ? (
        <ul>
          <li>
            <Link to="/profile/">Profile</Link>
          </li>
          <li>
            <Link to={`/recipes/${userPathParam}`}>Recipes</Link>
          </li>
          <li>
            <Link to="/plan">Meal Plans</Link>
          </li>
          
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      ) : (
        <ul>
          <li>test to see if conditional render works</li>
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
