import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../store/slices/userSlice";
import LoginInput from "./LoginInput";
import axios from "axios";
const PORT = process.env.REACT_APP_PORT;
const URL = `http://localhost:${PORT}/user`;

function LoginContainer() {
  const dispatch = useDispatch();

  async function updateUserState(user: any) {
    // console.log(user);
    console.log(dispatch(userActions.setUser(user)));
    try {
      // sends post request to backend
      if (await getUser(user)) {
        console.log("success");
        // should change the global user state variable using the properties of the user object
        dispatch(userActions.setUser(user));
        console.log(dispatch(userActions.setUser(user)));
        
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function getUser(user: any) {
    try {
      let response = await axios.post(`${URL}/login`, {
        username: user.username,
        password: user.password,
      });

      return response;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <LoginInput updateUserState={updateUserState} />
    </>
  );
}

export default LoginContainer;
