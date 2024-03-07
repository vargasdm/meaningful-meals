import React, { useState } from "react";
// props is referencing any state variabels and functions in Register Container
function LoginInput(props: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLoginSubmit(event: any) {
    event.preventDefault();
    props.updateUser({ username, password });
  }

  return (
    <>
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
    </>
  );
}

export default LoginInput;
