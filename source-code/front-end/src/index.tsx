import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store/store";
import { BrowserRouter } from "react-router-dom";
// import React from "react";
import { createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import LoginContainer from "./components/Login/LoginContainer";
import RegisterContainer from "./components/Register/RegisterContainer";
import Recipe, { loader as recipeLoader } from "./components/Recipe/Recipe";
import SearchContainer from "./components/Search/SearchContainer";
import Error from "./components/Error"

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />, // This should be the root route
		errorElement: <Error />,
		children: [
			{
				path: '/',
				element: <LoginContainer />
			}, {
				path: '/login',
				element: <LoginContainer />
			}, {
				path: '/register',
				element: <RegisterContainer />
			}, {
				path: '/recipes/:id',
				element: <Recipe />,
				loader: recipeLoader
			}
		]
	}
]);


const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<React.StrictMode>
		{/* <BrowserRouter> */}
		<Provider store={store}>
			{/* <App /> */}
			<RouterProvider router={router} />
		</Provider>
		{/* </BrowserRouter> */}
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
