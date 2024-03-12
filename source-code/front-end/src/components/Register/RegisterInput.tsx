import React, { useState } from "react";

function RegisterInput(props: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [email, setEmail] = useState("");

  function handleRegisterSubmit(event: any) {
    event.preventDefault();
    props.addUser({ username, password });
  }

  return (
    <>
      <h1>Register Form</h1>
      <form onSubmit={handleRegisterSubmit}>
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
    </>
  );
}

export default RegisterInput;
