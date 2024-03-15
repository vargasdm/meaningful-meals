import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store, { persistor } from "./store/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LoginContainer from "./components/Login/LoginContainer";
import RegisterContainer from "./components/Register/RegisterContainer";
import Recipe, { loader as recipeLoader } from "./components/Recipe/Recipe";
import SearchContainer from "./components/Search/SearchContainer";
import RecipeContainer from "./components/Recipe/RecipeContainer";
import Error from "./components/Error";
import RecipeSingle from "./components/Recipe/RecipeSingle";
import Profile, { loader as profileLoader } from './components/Profile/Profile';
import NewRecipeContainer from "./components/Recipe/NewRecipeContainer";
import MealPlan from './components/MealPlan/MealPlan';

import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

// const persistor = persistStore(store);

// export { store, persistor };

const router = createBrowserRouter([
	{
		// 	path: "/",
		// 	element: <App />, // This should be the root route
		// 	errorElement: <Error />,
		// 	children: [
		// 		{
		// 			path: "/",
		// 			element: <SearchContainer />,
		// 		},
		// 		{
		// 			path: "/login",
		// 			element: <LoginContainer />,
		// 		},
		// 		{
		// 			path: "/register",
		// 			element: <RegisterContainer />,
		// 		},
		// 		{
		// 			path: "/recipes/user-recipes/:username",
		// 			element: <RecipeContainer />,
		// 		},
		// 		// {
		// 		//   path: "/recipes/user-recipes/:id",
		// 		//   element: <RecipeSingle />,
		// 		// },
		// 		{
		// 			path: "/recipes/:id",
		// 			element: <Recipe />,
		// 			loader: recipeLoader
		// 		},

		// 	],
		// },
		// {
		path: "/",
		element: <App />, // This should be the root route
		errorElement: <Error />,
		children: [
			{
				path: "/",
				element: <SearchContainer />,
			},
			{
				path: "/login",
				element: <LoginContainer />,
			},
			{
				path: '/plan',
				element: <MealPlan />
			},
			{
				path: "/register",
				element: <RegisterContainer />,
			},
			{
				path: "/recipes/user-recipes/:username",
				element: <RecipeContainer />,
			},
			{
				path: "/recipes/new-recipe",
				element: <NewRecipeContainer />,
			},

			{
				path: "/recipes/:id",
				element: <Recipe />,
				loader: recipeLoader,
			},
			{
				path: '/profile',
				element: <Profile />,
				loader: profileLoader
			},
			{
				path: '/search',
				element: <SearchContainer />
			}
		],
	},
]);

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<RouterProvider router={router} />
			</PersistGate>
		</Provider>
	</React.StrictMode>
);
