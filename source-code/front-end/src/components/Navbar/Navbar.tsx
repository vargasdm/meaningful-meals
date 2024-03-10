import React from "react";
import { Link } from "react-router-dom";

// will change this when I use bootstrap
import "./Navbar.css";

function Navbar() {
  return (
    <nav>
      <Link to="/">MeaningFul Meals</Link>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
