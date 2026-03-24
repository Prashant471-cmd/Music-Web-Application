import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getStartPage from "../assets/LoginPic.png";
import logo from "../assets/AppLogo.png";

const CLIENT_ID = "ff731e02bc72489dbd8387e40d5d29f0";
// This will automatically grab your live domain and add /login to it
// Result: https://melo.prashantdeuja.com.np/login
const REDIRECT_URI = window.location.origin + "/login";

// THE REAL SPOTIFY ENDPOINTS
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

const SCOPES = [
  "streaming",
  "user-read-email",
  "user-read-private",
  "user-library-read",
  "user-read-playback-state",
  "user-modify-playback-state",
];

// --- 1. PKCE Security Helper Functions ---
const generateRandomString = (length) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

const sha256 = async (plain) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
};

const base64encode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

const Login = () => {
  const [token, setToken] = useState(
    window.localStorage.getItem("access_token") || "",
  );
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get("code");

    if (code && !token) {
      exchangeToken(code);
    } else if (token) {
      // If we already have a token, skip the login screen!
      navigate("/dashboard");
    }
  }, [token, navigate]);

  const handleLogin = async () => {
    const codeVerifier = generateRandomString(64);
    window.localStorage.setItem("code_verifier", codeVerifier);

    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);

    const authUrl = new URL(AUTH_ENDPOINT);
    authUrl.search = new URLSearchParams({
      response_type: "code",
      client_id: CLIENT_ID,
      scope: SCOPES.join(" "),
      code_challenge_method: "S256",
      code_challenge: codeChallenge,
      redirect_uri: REDIRECT_URI,
    }).toString();

    window.location.href = authUrl.toString();
  };

  const exchangeToken = async (code) => {
    const codeVerifier = window.localStorage.getItem("code_verifier");

    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        grant_type: "authorization_code",
        code: code,
        redirect_uri: REDIRECT_URI,
        code_verifier: codeVerifier,
      }),
    };

    try {
      const response = await fetch(TOKEN_ENDPOINT, payload);
      const data = await response.json();

      if (data.access_token) {
        window.localStorage.setItem("access_token", data.access_token);
        setToken(data.access_token);
        window.history.replaceState({}, document.title, "/login"); // Clean the URL
        navigate("/dashboard"); // Teleport to Dashboard!
      }
    } catch (error) {
      console.error("Error exchanging token", error);
    }
  };

  return (
    <div
      className="Login-container"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.7)), url(${getStartPage})`,
      }}
    >
      <div className="welcomePage-logo">
        <img src={logo} alt="App Logo" />
      </div>

      <div className="welcomePage-content">
        <h1>
          <strong>Hi !</strong>
        </h1>
        <h1>
          Login/SignUp to start listening to
          <br />
          all your favorite artists.
        </h1>
        <button onClick={handleLogin} className="login-button">
          <strong>Login / SignUp</strong>
        </button>
      </div>
    </div>
  );
};

export default Login;
