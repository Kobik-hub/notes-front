import React, { useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Main from "./components/Main";
import Login from "./components/Login";
import Nav from "./components/Nav";
import Register from "./components/Register";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState({
    isLogged: false,
  });

  const jwtToken = localStorage.getItem("token");
  console.log(jwtToken);
  return (
    <BrowserRouter>
      <div className="App">
        <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        {!isLoggedIn ? (
          <Route
            path="/register"
            exact
            render={(props) => (
              <Register setIsLoggedIn={setIsLoggedIn} {...props} />
            )}
          />
        ) : (
          ""
        )}

        <Route
          path="/"
          exact
          render={() =>
            jwtToken ? (
              <Main isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
