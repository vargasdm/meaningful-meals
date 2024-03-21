import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

// props is referencing any state variabels and functions in Register Container
function LoginInput(props: any) {
	const user = useSelector((state: any) => state.user);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	function handleLoginSubmit(event: any) {
		event.preventDefault();
		props.handleLogin({ username, password });
	}

	return (
		<>
			{!user.isLoggedIn && <>
				<h1>Login Form</h1>
				<form onSubmit={handleLoginSubmit}>
					<input
						type="text"
						name="username"
						placeholder="username"
						minLength={3}
						maxLength={30}
						required
						onChange={(e) => setUsername(e.target.value)}
					/>
					<input
						type="password"
						name="password"
						placeholder="password"
						minLength={3}
						maxLength={30}
						required
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button type="submit">Submit</button>
					<button type="reset">Reset</button>
				</form>
			</>}
			{user.isLoggedIn === true && <Navigate to='/' />}
		</>
	);
}

export default LoginInput;
