import React from "react";
import RegisterInput from "./RegisterInput";
import axios from "axios";
const PORT = process.env.REACT_APP_PORT;
const URL = `http://localhost:${PORT}/user`;


function RegisterContainer() {
  async function addUser(user: any) {
    console.log(user);
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
      let response = await axios.post(`${URL}/register`, {
        username: user.username,
        password: user.password,
        email: user.email
      });

      return response;
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <RegisterInput addUser={addUser} />
    </>
  );
}

export default RegisterContainer;
