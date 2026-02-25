import React, { useEffect, useState } from "react";
import getStartPage from "../assets/LoginPic.png";
import logo from "../assets/AppLogo.png";
// import "./index.css";

const CLIENT_ID = "YOUR_CLIENT_ID_HERE";
const REDIRECT_URI = "http://localhost:5173/";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";

// redirect the user to Spotify's authorization endpoint, and Spotify returns an access token in the URL hash which I save to local storage

const Login = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    let windowToken = window.localStorage.getItem("token");

    if (!windowToken && hash) {
      windowToken = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", windowToken);
    }

    setToken(windowToken);
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  return (
    <div className="Login-container"
      style={
        { backgroundImage: `linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.7)),
           url(${getStartPage})`
        }
      }
    >
      <div className="welcomePage-logo">
        <img src={logo} alt="App Logo" />
      </div>

      <div className="welcomePage-content">
        <h1><strong>Hi !</strong></h1>
        <h1>
          Login/SignUp to start listening to
          <br />
          all your favorite artists.
        </h1>

        {!token ? (
          <a
            href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
            className="login-button"
          >
            <strong>Login / SignUp</strong>
          </a>
        ) : (
          <div className="logged-in">
            <h2 className="success-text">Successfully Logged In !</h2>
            <button onClick={logout} className="logout-button">
              Logout
            </button>
          </div>

        )}
      </div>

    </div>
  );
};

export default Login;
