import React from "react";
import endpoints from "../../endpoints";
import RegisterInput from "./RegisterInput";
import axios from "axios";
const USERS_ENDPOINT = endpoints.USERS_ENDPOINT;
console.log(USERS_ENDPOINT);

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
      console.log(`${USERS_ENDPOINT}/register`);

      let response = await axios.post(`${USERS_ENDPOINT}/register`, {
        username: user.username,
        password: user.password,
      });

      console.log(response);
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
