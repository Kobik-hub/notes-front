import React, { useState } from "react";
import axios from "axios";
import notesLogo from "../icons/notes.svg";
import { useAlert } from "react-alert";
//import components

const Login = ({ isLoggedIn, setIsLoggedIn }) => {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const alert = useAlert();
  const emailInputHandler = (e) => {
    setUserInfo({ ...userInfo, email: e.target.value });
  };

  const passwordInputHandler = (e) => {
    setUserInfo({ ...userInfo, password: e.target.value });
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const jwt = await axios.post(
        process.env.REACT_APP_API_URL + "/api/auth",
        {
          email: userInfo.email,
          password: userInfo.password,
        }
      );
      if (jwt) {
        localStorage.setItem("token", jwt.data);
        setIsLoggedIn(true);
      }
    } catch (ex) {
      alert.show("Email or password is incorrect");
    }
  };

  return (
    <div className="login">
      <form action="">
        <img src={notesLogo} alt="" />

        <ul>
          <li>
            <input
              placeholder="Email"
              onChange={emailInputHandler}
              type="email"
              id=""
            />
          </li>
          <li>
            <input
              placeholder="Password"
              onChange={passwordInputHandler}
              type="password"
              id=""
            />
          </li>
          <li>
            <button onClick={loginHandler} type="submit">
              Sign in
            </button>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default Login;
