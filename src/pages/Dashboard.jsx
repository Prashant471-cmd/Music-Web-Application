import React, { useEffect, useState } from "react";
// import "./Dashboard.css"; // Make sure this is uncommented so your styles work!
import logo from "../assets/AppLogo.png";

const Dashboard = () => {
  // State to hold our real Spotify data
  const [userProfile, setUserProfile] = useState(null);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    // 1. Get the token from local storage
    const token = window.localStorage.getItem("access_token");
    if (!token) return;

    // Helper function to fetch data securely using the real Spotify API URL
    const fetchSpotifyData = async (endpoint) => {
      const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch");
      return response.json();
    };

    // 2. Fetch all the data simultaneously
    const loadDashboardData = async () => {
      try {
        // Fetch User Profile (Name, Profile Pic)
        const profileData = await fetchSpotifyData("/me");
        setUserProfile(profileData);

        // Fetch Recently Played (Limit to 10)
        const recentData = await fetchSpotifyData("/me/player/recently-played?limit=10");
        
        // Spotify returns lots of duplicates here, so we extract just the unique tracks
        const uniqueTracks = Array.from(
          new Set(recentData.items.map((item) => item.track.id))
        ).map(
          (id) => recentData.items.find((item) => item.track.id === id).track
        );
        setRecentlyPlayed(uniqueTracks);

        // Fetch Top Tracks (Limit to 5)
        const topData = await fetchSpotifyData("/me/top/tracks?limit=5");
        setTopTracks(topData.items);
      } catch (error) {
        console.error("Error loading Spotify data:", error);
      }
    };

    loadDashboardData();
  }, []);

  // Function to play a specific song using the Web Playback SDK
  const playSong = async (trackUri) => {
    const token = window.localStorage.getItem("access_token");
    const deviceId = window.localStorage.getItem("device_id"); // Saved from Player.jsx

    if (!token || !deviceId) {
      alert("Please open your Spotify App and select 'Melo Web Player' from the devices list first!");
      return;
    }

    try {
      // FIXED: Pointing to the correct Spotify player endpoint
      await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uris: [trackUri], // Spotify needs the exact URI of the song to play it
        }),
      });
    } catch (error) {
      console.error("Error playing song:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        {/* Header */}
        <header className="dashboard-header">
          <div className="dashboard-logo">
            <img
              src={logo}
              alt="Melo"
              style={{ width: "90px", objectFit: "contain" }}
            />
          </div>

          <div className="header-icons">
            {/* Notification Bell Icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 16v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5,1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-5 4c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2z" />
            </svg>

            {/* Show real profile picture if available, else show default icon */}
            {userProfile?.images?.[0]?.url ? (
              <img
                src={userProfile.images[0].url}
                alt="Profile"
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.67 0-5.06-1.1-6.8-2.84.14-1.9 4.14-2.96 6.8-2.96s6.66 1.06 6.8 2.96C17.06 18.9 14.67 20 12 20z" />
              </svg>
            )}
          </div>
        </header>

        {/* Dynamic Greeting */}
        <h2 className="greeting">
          Good afternoon, {userProfile?.display_name || "dear"}!
        </h2>

        {/* Pick up where you left (Real Recent Data) */}
        <section className="section-container">
          <div className="section-header">
            <h3 className="section-title">Pick up where you left</h3>
            <button className="view-all-btn">View all</button>
          </div>
          <div className="scroll-row">
            {recentlyPlayed.map((track) => (
              <div
                key={track.id}
                className="card-square"
                onClick={() => playSong(track.uri)}
                style={{ cursor: "pointer" }}
                title={`Play ${track.name}`}
              >
                {/* Dynamically pull the album cover image */}
                <img src={track.album.images[0]?.url} alt={track.name} />
              </div>
            ))}
          </div>
        </section>

        {/* Popular Songs (Real Top Tracks Data) */}
        <section className="section-container">
          <h3
            className="section-title"
            style={{ marginBottom: "15px", marginTop: "20px" }}
          >
            Popular songs
          </h3>
          <div className="popular-list">
            {topTracks.map((track) => (
              <div key={track.id} className="song-row">
                <img
                  src={track.album.images[0]?.url}
                  alt={track.name}
                  className="song-image"
                />
                <div className="song-info">
                  <div className="song-title">{track.name}</div>
                  <div className="song-artist">{track.artists[0]?.name}</div>
                </div>

                {/* Magic Play Button */}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="white"
                  style={{ cursor: "pointer", transition: "transform 0.2s" }}
                  onClick={() => playSong(track.uri)}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.2)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;