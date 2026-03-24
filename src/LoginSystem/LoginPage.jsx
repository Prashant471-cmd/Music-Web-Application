import React, { useEffect, useState } from "react";
import getStartPage from "../assets/LoginPic.png";
import logo from "../assets/AppLogo.png";
// import "./index.css";

const CLIENT_ID = "ff731e02bc72489dbd8387e40d5d29f0";
const REDIRECT_URI = window.location.origin + "/login";
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
// -----------------------------------------

const Login = () => {
  // We check for "access_token" instead of "token" to be more precise
  const [token, setToken] = useState(
    window.localStorage.getItem("access_token") || "",
  );

  useEffect(() => {
    // Spotify now returns a ?code=... in the URL search params, not a #hash
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get("code");

    if (code && !token) {
      exchangeToken(code);
    }
  }, [token]);

  // --- 2. The Login Action ---
  const handleLogin = async () => {
    // Generate the secret (Verifier) and the hashed version (Challenge)
    const codeVerifier = generateRandomString(64);
    window.localStorage.setItem("code_verifier", codeVerifier); // Save secret for later

    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);

    // Build the secure Spotify login URL
    const authUrl = new URL(AUTH_ENDPOINT);
    authUrl.search = new URLSearchParams({
      response_type: "code", // As requested by Spotify!
      client_id: CLIENT_ID,
      scope: SCOPES.join(" "),
      code_challenge_method: "S256",
      code_challenge: codeChallenge,
      redirect_uri: REDIRECT_URI,
    }).toString();

    // Redirect the user
    window.location.href = authUrl.toString();
  };

  // --- 3. The Token Exchange ---
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
        code_verifier: codeVerifier, // Proving we are the ones who initiated the login
      }),
    };

    try {
      const response = await fetch(TOKEN_ENDPOINT, payload);
      const data = await response.json();

      if (data.access_token) {
        window.localStorage.setItem("access_token", data.access_token);
        setToken(data.access_token);
        // Clean up the URL to remove the messy code
        window.history.replaceState({}, document.title, "/");
      }
    } catch (error) {
      console.error("Error exchanging token", error);
    }
  };

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("access_token");
    window.localStorage.removeItem("code_verifier");
  };

  return (
    <div
      className="Login-container"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.7)),
           url(${getStartPage})`,
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

        {!token ? (
          // Changed from an <a> tag to a <button> to run our async function
          <button onClick={handleLogin} className="login-button">
            <strong>Login / SignUp</strong>
          </button>
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
