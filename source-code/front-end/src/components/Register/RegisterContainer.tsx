
import React from "react";
import endpoints from "../../endpoints";
import RegisterInput from "./RegisterInput";
import axios from "axios";
import { useState } from "react";
const USERS_ENDPOINT = endpoints.USERS_ENDPOINT;
console.log(USERS_ENDPOINT);

function RegisterContainer() {
	const [errors, setErrors] = useState([] as any);
	async function addUser(user: any) {
		try {
			// sends post request to backend
			if (await postUser(user)) {
				console.log("success");
			}
		} catch (error) {
			console.error(error);
		}
	}

	async function postUser(user: any) {
		try {
			console.log(`${USERS_ENDPOINT}/register`);

			let response = await axios.post(`${USERS_ENDPOINT}/register`, {
				username: user.username,
				password: user.password,
			});

			console.log(response);
			return response;
		} catch (error: any) {
			if (error.response.data.errors !== typeof []) {
				const newError = [error.response.data.errors];
				setErrors(newError);
			} else {
				setErrors(error);
			}

			setTimeout(() => {
				setErrors([]);
			}, 15000);
		}
	}
	return (
		<>
			<div id="errors">
				{errors &&
					errors.map((item: any, index: any) => {
						return <p>{`${item}\n `}</p>;
					})}
			</div>
			<RegisterInput addUser={addUser} />
		</>
	);
}

export default RegisterContainer;
