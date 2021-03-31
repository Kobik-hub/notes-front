import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import notesLogo from "../icons/notes.svg";
import { useAlert } from "react-alert";

//import components

const Register = ({ setIsLoggedIn, props }) => {
  const alert = useAlert();

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  let history = useHistory();
  const nameInputHandler = (e) => {
    setUserInfo({ ...userInfo, name: e.target.value });
  };

  const emailInputHandler = (e) => {
    setUserInfo({ ...userInfo, email: e.target.value });
  };

  const passwordInputHandler = (e) => {
    setUserInfo({ ...userInfo, password: e.target.value });
  };

  const RegisterHandler = async (e) => {
    e.preventDefault();
    try {
      console.log(process.env.REACT_APP_API_URL);
      const jwt = await axios.post(
        process.env.REACT_APP_API_URL + "/api/users",
        {
          name: userInfo.name,
          email: userInfo.email,
          password: userInfo.password,
        }
      );
      if (jwt) {
        localStorage.setItem("token", jwt.data);
        setIsLoggedIn(true);
        history.push("/");
      }
    } catch (ex) {
      alert.show(ex.response.data);
    }
  };

  return (
    <div className="register">
      <form action="">
        <img src={notesLogo} alt="" />

        <ul>
          <li>
            {" "}
            <input
              placeholder="Full name"
              onChange={nameInputHandler}
              type="text"
              id=""
            />
          </li>
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
            <button onClick={RegisterHandler} type="submit">
              Register
            </button>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default Register;
