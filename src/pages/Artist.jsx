import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../assets/AppLogo.png";
// import "./Artist.css";

const Artist = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Grabs the artist ID from the URL!
  
  const [artist, setArtist] = useState(null);
  const [topTracks, setTopTracks] = useState([]);
  
  // Track playing state for the dynamic icons
  const [playingUri, setPlayingUri] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem("access_token");
    if (!token) {
      navigate("/");
      return;
    }

    if (!id) return;

    const fetchArtistData = async () => {
      try {
        // 1. Fetch Real Artist Profile
        const artistRes = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (artistRes.ok) {
          const artistData = await artistRes.json();
          setArtist(artistData);
        }

        // 2. Fetch Real Artist Top Tracks
        const tracksRes = await fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=US`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (tracksRes.ok) {
          const tracksData = await tracksRes.json();
          setTopTracks(tracksData.tracks.slice(0, 5)); // Grab top 5 hits
        }
      } catch (error) {
        console.error("Error fetching artist data:", error);
      }
    };

    fetchArtistData();
  }, [id, navigate]);

  // 3. Play the entire artist's discography
  const playArtist = async () => {
    if (!artist) return;
    const token = window.localStorage.getItem("access_token");
    const deviceId = window.localStorage.getItem("device_id");

    if (!deviceId) {
      alert("Waiting for Spotify player to connect...");
      return;
    }

    try {
      await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ context_uri: artist.uri }),
      });
      setIsPlaying(true);
    } catch (error) {
      console.error("Error playing artist:", error);
    }
  };

  // 4. Play/Pause specific tracks
  const handlePlayPause = async (trackUri) => {
    const token = window.localStorage.getItem("access_token");
    const deviceId = window.localStorage.getItem("device_id");

    if (!token || !deviceId) return;

    try {
      if (playingUri === trackUri && isPlaying) {
        // PAUSE
        await fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`, {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsPlaying(false);
      } else {
        // PLAY
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

  // Fallback while loading
  if (!artist) {
    return (
      <div className="artist-container" style={{ color: "white", padding: "50px", textAlign: "center" }}>
        <h2>Loading Artist...</h2>
      </div>
    );
  }

  return (
    <div className="artist-container">
      {/* Hero Section with Dynamic Background */}
      <div 
        className="artist-hero" 
        style={{ 
          backgroundImage: `url(${artist.images[0]?.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative"
        }}
      >
        <div className="hero-overlay" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)" }}></div>
        
        <header className="page-header transparent" style={{ position: "relative", zIndex: 10 }}>
          <img 
            src={logo} 
            alt="Melo" 
            className="header-logo" 
            onClick={() => navigate("/dashboard")}
            style={{ cursor: "pointer" }}
          />
          <div className="header-icons" onClick={() => navigate("/profile")} style={{ cursor: "pointer" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18 16v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5,1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-5 4c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2z"/></svg>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.67 0-5.06-1.1-6.8-2.84.14-1.9 4.14-2.96 6.8-2.96C17.06 18.9 14.67 20 12 20z"/></svg>
          </div>
        </header>
        
        <div className="artist-hero-info" style={{ position: "relative", zIndex: 10 }}>
          <h1 className="artist-name">{artist.name}</h1>
          <p className="monthly-listeners">{artist.followers.total.toLocaleString()} followers</p>
          <div className="artist-actions">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            <span style={{ fontSize: '24px', fontWeight: 'bold' }}>...</span>
          </div>
          {/* Main Play Button for the Artist */}
          <div className="big-play-btn" onClick={playArtist} style={{ cursor: "pointer" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          </div>
        </div>
      </div>

      {/* Real Track List */}
      <div className="artist-content">
        <h2 className="section-heading">Top hits</h2>
        <div className="track-list">
          {topTracks.length > 0 ? (
            topTracks.map(track => (
              <div 
                key={track.id} 
                className="list-row" 
                style={{ cursor: "pointer" }}
                onClick={() => handlePlayPause(track.uri)} // <-- Added onClick here!
              >
                <img 
                  src={track.album.images[2]?.url || track.album.images[0]?.url} 
                  alt={track.name} 
                  className="list-image" 
                />
                <div className="list-text">
                  {/* Title turns green if it's currently playing */}
                  <div className="list-title" style={{ color: playingUri === track.uri ? "#1db954" : "white" }}>
                    {track.name}
                  </div>
                  <div className="list-subtitle">{track.artists.map(a => a.name).join(", ")}</div>
                </div>
                
                {/* Dynamically Swap Heart/Play/Pause Icons */}
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white" style={{ opacity: 0.7 }}><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                  
                  {playingUri === track.uri && isPlaying ? (
                    // Pause Icon
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#1db954">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                    </svg>
                  ) : (
                    // Play Icon
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white" style={{ opacity: 0.5 }}>
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  )}
                </div>

              </div>
            ))
          ) : (
            <p style={{ color: "#b3b3b3" }}>No tracks available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Artist;