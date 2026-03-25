// src/spotify.js

export const authEndpoint = "https://accounts.spotify.com/authorize";
// Replace with your exact Client ID from the Spotify Developer Dashboard
const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID || "ff731e02bc72489dbd8387e40d5d29f0"; 
// This must match EXACTLY what you put in your Spotify Dashboard settings (e.g., https://melo.prashantdeuja.com.np/ )
const redirectUri = window.location.origin + "/login"; 

// These scopes tell Spotify what your app is allowed to do. 
// "streaming" is REQUIRED for the Web Playback SDK to play music!
const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
  "streaming", 
  "user-read-email",
  "user-read-private",
  "user-library-read",
  "user-library-modify"
];

// Extracts the token from the URL after Spotify redirects back to your app
export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      let parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
};

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;