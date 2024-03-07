import React from "react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import "./App.css";
import LoginContainer from "./components/Login/LoginContainer";
import RegisterContainer from "./components/Register/RegisterContainer";

const router = createBrowserRouter([
	{
		path: '/',
		element:
			<div className="App">
				<LoginContainer />
				<RegisterContainer />
			</div>
	},
]);

function App() {
	// return (
	// <div className="App">
	//   <LoginContainer />
	//   <RegisterContainer />
	// </div>
	//   );
	return <RouterProvider router={router} />
}

export default App;
