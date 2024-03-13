import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../store/slices/userSlice";
import LoginInput from "./LoginInput";
import axios from "axios";
import { render } from "@testing-library/react";
import SearchContainer from "../Search/SearchContainer";
import { redirect } from "react-router-dom";
const PORT = process.env.REACT_APP_PORT;
const URL = `http://localhost:${PORT}/user`;

function LoginContainer() {
	const dispatch = useDispatch();

	async function loginUser(user: any) {
		// console.log(dispatch(userActions.setUser(user)));
		// try {
		//   // sends post request to backend
		//   if (await getUser(user)) {
		//     console.log("success");
		//     // should change the global user state variable using the properties of the user object
		//     dispatch(userActions.setUser(user));
		//     console.log(dispatch(userActions.setUser({ username: user.username, isLoggedIn: true })));
		//     return redirect("/")
		//   }
		// } catch (error) {
		//   console.error(error);
		// }
		try {
			// const response = await login(user);
			let response = await axios.post(`${URL}/login`, {
				username: user.username,
				password: user.password,
			});

			if (response) {
				dispatch(userActions.loginUser({ username: user.username, isLoggedIn: true }));
				return redirect("/");
			}
		} catch (error) {
			console.error(error);
		}
	}

	// async function login(user: any) {
	// 	try {
	// 		// let response = await axios.post(`${URL}/login`, {
	// 		// 	username: user.username,
	// 		// 	password: user.password,
	// 		// });

	// 		return response;
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// }

	return (
		<>
			<LoginInput updateUserState={loginUser} />
		</>
	);
}

export default LoginContainer;
