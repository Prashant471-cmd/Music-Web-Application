import React, { useEffect, useState } from "react";
// import "./Dashboard.css"; 
import logo from "../assets/AppLogo.png";

const Dashboard = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [topTracks, setTopTracks] = useState([]);

  // State to track play/pause dynamically
  const [playingUri, setPlayingUri] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem("access_token");
    if (!token) return;

    // Fetch Helper - using the REAL Spotify API base URL!
    const fetchSpotifyData = async (endpoint) => {
      const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        console.warn(`Failed to fetch ${endpoint}. Check your login scopes!`);
        return null;
      }
      return response.json();
    };

    const loadDashboardData = async () => {
      try {
        // 1. Fetch User Profile
        const profileData = await fetchSpotifyData("/me");
        if (profileData) setUserProfile(profileData);

        // 2. Fetch Recently Played (Pick up where you left)
        const recentData = await fetchSpotifyData("/me/player/recently-played?limit=15");
        if (recentData && recentData.items) {
          const uniqueTracks = Array.from(
            new Set(recentData.items.map((item) => item.track.id))
          ).map((id) => recentData.items.find((item) => item.track.id === id).track);
          setRecentlyPlayed(uniqueTracks.slice(0, 5)); // Keep it clean with top 5
        }

        // 3. Fetch Top Tracks (Popular Songs)
        const topData = await fetchSpotifyData("/me/top/tracks?limit=5&time_range=short_term");
        
        // We define a default fallback song ID just in case the user has no top tracks.
        // (This is the ID for Blinding Lights by The Weeknd)
        let seedTrackId = "0VjIjW4GlUZAMYd2vXMi3b"; 

        if (topData && topData.items && topData.items.length > 0) {
          setTopTracks(topData.items);
          seedTrackId = topData.items[0].id; // Replace fallback with their actual top track
        } else {
          console.log("User has no top tracks! Using fallback seed for recommendations.");
        }

        // 4. Generate "For You" Recommendations
        const recData = await fetchSpotifyData(`/recommendations?limit=5&seed_tracks=${seedTrackId}`);
        if (recData && recData.tracks) {
          setRecommendations(recData.tracks);
        }
        
      } catch (error) {
        console.error("Error loading Spotify data:", error);
      }
    };

    loadDashboardData();
  }, []);

  // Play / Pause Toggle Function
  const handlePlayPause = async (trackUri) => {
    const token = window.localStorage.getItem("access_token");
    const deviceId = window.localStorage.getItem("device_id");

    if (!token || !deviceId) {
      alert("Please wait for Melo Web Player to connect first!");
      return;
    }

    try {
      if (playingUri === trackUri && isPlaying) {
        // PAUSE - using the REAL Spotify API endpoint!
        await fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`, {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsPlaying(false);
      } else {
        // PLAY - using the REAL Spotify API endpoint!
        await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uris: [trackUri] }),
        });
        setPlayingUri(trackUri);
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error toggling playback:", error);
    }
  };

  return (
    <div className="dashboard-container" style={{ padding: "20px", paddingBottom: "100px", color: "white", backgroundColor: "black", minHeight: "100vh" }}>
      <div className="dashboard-content">
        
        {/* Header */}
        <header className="dashboard-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div className="dashboard-logo">
            <img src={logo} alt="Melo" style={{ width: "90px", objectFit: "contain" }} />
          </div>

          <div className="header-icons" style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 16v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5,1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-5 4c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2z" />
            </svg>

            {userProfile?.images?.[0]?.url ? (
              <img
                src={userProfile.images[0].url}
                alt="Profile"
                style={{ width: "28px", height: "28px", borderRadius: "50%", objectFit: "cover" }}
              />
            ) : (
              <div style={{ width: "28px", height: "28px", borderRadius: "50%", backgroundColor: "#333" }} />
            )}
          </div>
        </header>

        {/* Dynamic Greeting */}
        <h2 className="greeting" style={{ fontSize: "1.2rem", marginBottom: "20px" }}>
          Good afternoon, {userProfile?.display_name || "dear"}!
        </h2>

        {/* --- SECTION: Pick up where you left --- */}
        <section className="section-container" style={{ marginBottom: "30px" }}>
          <div className="section-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
            <h3 className="section-title" style={{ fontSize: "1.1rem", margin: 0 }}>Pick up where you left</h3>
            <span style={{ fontSize: "0.8rem", color: "#b3b3b3", cursor: "pointer" }}>View all</span>
          </div>
          <div className="scroll-row" style={{ display: "flex", gap: "15px", overflowX: "auto", paddingBottom: "10px" }}>
            {recentlyPlayed.map((track) => (
              <div key={track.id} onClick={() => handlePlayPause(track.uri)} style={{ flexShrink: 0, cursor: "pointer", position: "relative" }}>
                <img 
                  src={track.album.images[0]?.url} 
                  alt={track.name} 
                  style={{ width: "100px", height: "100px", borderRadius: "8px", objectFit: "cover", opacity: playingUri === track.uri && isPlaying ? 0.5 : 1 }} 
                />
              </div>
            ))}
          </div>
        </section>

        {/* --- SECTION: For You --- */}
        <section className="section-container" style={{ marginBottom: "30px" }}>
          <div className="section-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
            <h3 className="section-title" style={{ fontSize: "1.1rem", margin: 0 }}>For you</h3>
            <span style={{ fontSize: "0.8rem", color: "#b3b3b3", cursor: "pointer" }}>View all</span>
          </div>
          <div className="scroll-row" style={{ display: "flex", gap: "15px", overflowX: "auto", paddingBottom: "10px" }}>
            {recommendations.map((track) => (
              <div key={track.id} onClick={() => handlePlayPause(track.uri)} style={{ flexShrink: 0, cursor: "pointer" }}>
                <img 
                  src={track.album.images[0]?.url} 
                  alt={track.name} 
                  style={{ width: "140px", height: "140px", borderRadius: "12px", objectFit: "cover" }} 
                />
              </div>
            ))}
          </div>
        </section>

        {/* --- SECTION: Popular Songs --- */}
        <section className="section-container">
          <h3 className="section-title" style={{ fontSize: "1.1rem", marginBottom: "15px" }}>
            Popular songs
          </h3>
          <div className="popular-list" style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {topTracks.map((track) => (
              <div key={track.id} className="song-row" onClick={() => handlePlayPause(track.uri)} style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                <img
                  src={track.album.images[0]?.url}
                  alt={track.name}
                  style={{ width: "50px", height: "50px", borderRadius: "4px", marginRight: "15px" }}
                />
                <div className="song-info" style={{ flexGrow: 1 }}>
                  <div className="song-title" style={{ fontWeight: "bold", fontSize: "1rem", marginBottom: "4px" }}>{track.name}</div>
                  <div className="song-artist" style={{ fontSize: "0.8rem", color: "#b3b3b3" }}>{track.artists[0]?.name}</div>
                </div>

                {/* Dynamically swap the Play and Pause icons */}
                {playingUri === track.uri && isPlaying ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                )}
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Dashboard;