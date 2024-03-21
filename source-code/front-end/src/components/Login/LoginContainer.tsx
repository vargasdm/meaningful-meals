import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../store/slices/userSlice";
import LoginInput from "./LoginInput";
import axios from "axios";
import { render } from "@testing-library/react";
import SearchContainer from "../Search/SearchContainer";
import { useNavigate } from "react-router-dom";
import { redirect } from "react-router-dom";
import FavoriteButton from "../Favorite/FavoriteButton";
import CommentButton from "../Comment/CommentButton";
import endpoints from "../../endpoints";
const USERS_ENDPOINT = endpoints.USERS_ENDPOINT;
console.log(USERS_ENDPOINT);

function LoginContainer() {
  const [errors, setErrors] = useState([] as any);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  async function handleLogin(user: any) {
    try {
      let res = await axios.post(`${endpoints.USER_ENDPOINT}/login`, {
        username: user.username,
        password: user.password,
      });

      if (res) {
        dispatch(
          userActions.loginUser({
            // This should set the user slice state in the Redux store
            // to those received in the res. The JWT is essential for
            // making authorized requests!
            userID: res.data.user_id,
            username: res.data.username,
            jwt: res.data.token,
          })
        );
        return navigate("/");
      }
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
      <LoginInput handleLogin={handleLogin} />
    </>
  );
}

export default LoginContainer;
