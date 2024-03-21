import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";
import "./LoginInput.css";

function LoginInput(props: any) {
	const user = useSelector((state: any) => state.user);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

  function handleLoginSubmit(event: any) {
    event.preventDefault();
    props.handleLogin({ username, password });
  }

  return (
    <div className="loginForm">
      {!user.isLoggedIn && (
        <>
          <h1>Login Form</h1>
          <Form onSubmit={handleLoginSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
				name="username"
                placeholder="Enter username"
                minLength={3}
                maxLength={30}
                required
                onChange={(e) => setUsername(e.target.value)}
                className="loginInput"
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
				name="password"
                placeholder="Enter password"
                minLength={3}
                maxLength={30}
                required
                onChange={(e) => setPassword(e.target.value)}
                className="loginInput"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Button variant="secondary" type="reset">
              Reset
            </Button>
          </Form>
        </>
      )}
      {user.isLoggedIn === true && <Navigate to="/" />}
    </div>
  );
}

export default LoginInput;
