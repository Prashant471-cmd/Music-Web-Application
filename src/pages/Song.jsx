import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/AppLogo.png";
// import "./Song.css"; 

const Song = () => {
  const navigate = useNavigate();
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // State to hold the raw millisecond times
  const [progressMs, setProgressMs] = useState(0);
  const [durationMs, setDurationMs] = useState(0);

  // Helper function to convert milliseconds to m:ss format
  const formatTime = (ms) => {
    if (!ms) return "0:00";
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // 1. Function to check what is currently playing
  const fetchCurrentlyPlaying = async () => {
    const token = window.localStorage.getItem("access_token");
    if (!token) return;

    try {
      // REAL SPOTIFY ENDPOINT: Get Currently Playing
      const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 204 || response.status > 400) {
        return; // Nothing is playing or error
      }

      const data = await response.json();
      
      if (data.item) {
        setCurrentTrack(data.item);
        setIsPlaying(data.is_playing);
        
        // Save raw milliseconds for the text display
        setProgressMs(data.progress_ms);
        setDurationMs(data.item.duration_ms);

        // Calculate progress percentage for the visual bar
        const progressPercent = (data.progress_ms / data.item.duration_ms) * 100;
        setProgress(progressPercent);
      }
    } catch (error) {
      console.error("Error fetching current track:", error);
    }
  };

  // 2. Poll Spotify every 1 second for smoother syncing
  useEffect(() => {
    fetchCurrentlyPlaying(); 
    const interval = setInterval(fetchCurrentlyPlaying, 1000); 
    return () => clearInterval(interval); 
  }, []);

  // 3. Playback Control Functions (Using REAL Spotify Endpoints)
  const handlePlayPause = async () => {
    const token = window.localStorage.getItem("access_token");
    const endpoint = isPlaying 
      ? "https://api.spotify.com/v1/me/player/pause" 
      : "https://api.spotify.com/v1/me/player/play";

    await fetch(endpoint, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });
    setIsPlaying(!isPlaying); 
  };

  const skipToNext = async () => {
    const token = window.localStorage.getItem("access_token");
    await fetch("https://api.spotify.com/v1/me/player/next", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    setTimeout(fetchCurrentlyPlaying, 500); 
  };

  const skipToPrevious = async () => {
    const token = window.localStorage.getItem("access_token");
    await fetch("https://api.spotify.com/v1/me/player/previous", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    setTimeout(fetchCurrentlyPlaying, 500);
  };

  // 4. NEW: Seek Function to let you click on the progress bar!
  const handleSeek = async (e) => {
    if (!durationMs) return;
    
    // Calculate where the user clicked on the bar
    const progressBar = e.currentTarget;
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
    const clickPercent = clickPosition / progressBar.offsetWidth;
    const newPositionMs = Math.floor(clickPercent * durationMs);

    // Update UI immediately so it feels fast
    setProgress(clickPercent * 100);
    setProgressMs(newPositionMs);

    // REAL SPOTIFY ENDPOINT: Tell Spotify to jump to that exact time
    const token = window.localStorage.getItem("access_token");
    await fetch(`https://api.spotify.com/v1/me/player/seek?position_ms=${newPositionMs}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  // If nothing is playing, show a fallback message
  if (!currentTrack) {
    return (
      <div className="song-container" style={{ color: "white", textAlign: "center", paddingTop: "50px" }}>
        <h2>No music is playing right now!</h2>
        <p>Go to the Dashboard or Search page to start a song.</p>
        <button onClick={() => navigate("/dashboard")} style={{ marginTop: "20px", padding: "10px 20px" }}>Go Home</button>
      </div>
    );
  }

  return (
    <div className="song-container">
      <header className="page-header">
        <img 
          src={logo} 
          alt="Melo" 
          className="header-logo" 
          onClick={() => navigate("/dashboard")}
          style={{ cursor: "pointer" }}
        />
        <div className="header-icons">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18 16v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5,1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-5 4c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2z"/></svg>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.67 0-5.06-1.1-6.8-2.84.14-1.9 4.14-2.96 6.8-2.96s6.66 1.06 6.8 2.96C17.06 18.9 14.67 20 12 20z"/></svg>
        </div>
      </header>

      {/* Real Cover Art */}
      <div className="now-playing-cover">
        <img 
          src={currentTrack.album.images[0]?.url || "https://via.placeholder.com/600"} 
          alt={currentTrack.name} 
        />
      </div>

      <div className="song-info-row">
        <div className="song-titles">
          <h2 className="now-playing-title">{currentTrack.name}</h2>
          <p className="now-playing-artist">{currentTrack.artists.map(a => a.name).join(", ")}</p>
        </div>
        <div className="song-actions">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        </div>
      </div>

      {/* Live Progress Bar with Click-to-Seek */}
      <div className="progress-container">
        {/* ADDED onClick={handleSeek} and cursor pointer */}
        <div className="progress-bar-bg" onClick={handleSeek} style={{ cursor: "pointer" }}>
          {/* ADDED pointerEvents: 'none' so the click registers on the background */}
          <div className="progress-bar-fill" style={{ width: `${progress}%`, pointerEvents: "none" }}></div>
          <div className="progress-knob" style={{ left: `${progress}%`, pointerEvents: "none" }}></div>
        </div>
        
        {/* Dynamic Timestamps */}
        <div className="time-info">
          <span>{formatTime(progressMs)}</span>
          <span>{formatTime(durationMs)}</span>
        </div>
      </div>

      {/* Real Playback Controls */}
      <div className="playback-controls">
        {/* Previous Button */}
        <svg width="32" height="32" viewBox="0 0 24 24" fill="#5c6bc0" onClick={skipToPrevious} style={{ cursor: "pointer" }}>
          <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
        </svg>
        
        {/* Play/Pause Button */}
        <div className="play-pause-btn" onClick={handlePlayPause} style={{ cursor: "pointer" }}>
          {isPlaying ? (
            // Pause Icon
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          ) : (
            // Play Icon
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          )}
        </div>

        {/* Next Button */}
        <svg width="32" height="32" viewBox="0 0 24 24" fill="#5c6bc0" onClick={skipToNext} style={{ cursor: "pointer" }}>
          <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
        </svg>
      </div>
    </div>
  );
};

export default Song;