import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./RegisterInput.css";

function RegisterInput(props: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleRegisterSubmit(event: any) {
    event.preventDefault();
    props.addUser({ username, password });
  }

  return (
    <div className="registerForm">
      <h1>Register Form</h1>
      <Form onSubmit={handleRegisterSubmit}>
        <Form.Group controlId="formRegisterUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Enter username"
            minLength={3}
            maxLength={30}
            required
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
          />
        </Form.Group>
        <Form.Group controlId="formRegisterPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter password"
            minLength={3}
            maxLength={30}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Button variant="secondary" type="reset">
          Reset
        </Button>
      </Form>
    </div>
  );
}

export default RegisterInput;
