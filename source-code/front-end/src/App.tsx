import React from "react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginContainer from "./components/Login/LoginContainer";
import RegisterContainer from "./components/Register/RegisterContainer";
import Recipe, { loader as recipeLoader } from './components/Recipe/Recipe';
import Error from './components/Error';
import "./App.css";

const router = createBrowserRouter([
	{
		path: '/',
		element:
			<div className="App">
				<LoginContainer />
				<RegisterContainer />
			</div>,
		errorElement: <Error />
	},
	{
		path: '/recipes/:id',
		element: <Recipe />,
		loader: recipeLoader
	}
	// errorElement: <Error />
]);

function App() {
	return <RouterProvider router={router} />
}

export default App;
