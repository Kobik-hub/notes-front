import React from "react";
import { Link, useHistory } from "react-router-dom";
const Nav = ({ isLoggedIn, setIsLoggedIn }) => {
  const jwtToken = localStorage.getItem("token");

  const history = useHistory();
  const logoutHandler = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };
  const homeButtonHandler = () => {
    history.push("/");
  };
  return (
    <div className="nav">
      <h3 onClick={homeButtonHandler}>Notes</h3>

      {jwtToken ? (
        <ul>
          <li>
            <button onClick={logoutHandler}> Logout</button>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to="/register" className="link" onClick={logoutHandler}>
              {" "}
              Register
            </Link>
          </li>
          <li>
            <Link to="/" className="link" onClick={logoutHandler}>
              {" "}
              Login
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Nav;
