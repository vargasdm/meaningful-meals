// import React from "react";
// import { createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
// import LoginContainer from "./components/Login/LoginContainer";
// import RegisterContainer from "./components/Register/RegisterContainer";
// import Recipe, { loader as recipeLoader } from "./components/Recipe/Recipe";
// import SearchContainer from "./components/Search/SearchContainer";
// import Error from "./components/Error";
import "./App.css";
import { Outlet } from 'react-router-dom';


function App() {
	return (
		<>
			<div className="App">
				<Navbar />
				<Outlet />
			</div>
		</>
	);
}

export default App;
