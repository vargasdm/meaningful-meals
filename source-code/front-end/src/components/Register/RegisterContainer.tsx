import React, { useState } from "react";
import RegisterInput from "./RegisterInput";
import axios from "axios";
import endpoints from "../../endpoints";

function RegisterContainer() {
  const [erros, setErrors] = useState([] as any);
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
      let response = await axios.post(`${endpoints.USER_ENDPOINT}/register`, {
        username: user.username,
        password: user.password,
      });

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
        {erros &&
          erros.map((item: any, index: any) => {
            return <p>{`${item}\n `}</p>;
          })}
      </div>
      <RegisterInput addUser={addUser} />
    </>
  );
}

export default RegisterContainer;
