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

	async function handleLogin(user: any) {
		try {
			let res = await axios.post(`${URL}/login`, {
				username: user.username,
				password: user.password,
			});

			console.log(res.data);

			if (res) {
				dispatch(userActions.loginUser({
					// username: user.username }));
					userID: res.data.user_id,
					username: res.data.username,
					jwt: res.data.token
				}));

				return redirect("/");
			}
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<>
			<LoginInput handleLogin={handleLogin} />
		</>
	);
}

export default LoginContainer;
