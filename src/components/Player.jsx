import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // <-- IMPORTANT: Imported useNavigate
// import "./Player.css";

const Player = () => {
  const [player, setPlayer] = useState(undefined);
  const [is_paused, setPaused] = useState(true);
  const [is_active, setActive] = useState(false);
  const [current_track, setTrack] = useState(null);

  const navigate = useNavigate(); // <-- IMPORTANT: Initialized navigate

  useEffect(() => {
    const token = window.localStorage.getItem("access_token");
    if (!token) return;

    window.onSpotifyWebPlaybackSDKReady = () => {
      const spotifyPlayer = new window.Spotify.Player({
        name: "Melo Web Player",
        getOAuthToken: (cb) => { cb(token); },
        volume: 0.5,
      });

      setPlayer(spotifyPlayer);

      spotifyPlayer.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        window.localStorage.setItem("device_id", device_id);
        transferPlaybackToMelo(device_id, token);
      });

      spotifyPlayer.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      spotifyPlayer.addListener("player_state_changed", (state) => {
        if (!state) {
          setActive(false);
          return;
        }
        setTrack(state.track_window.current_track);
        setPaused(state.paused);
        setActive(true);
      });

      spotifyPlayer.connect();
    };

    if (!document.querySelector('script[src="https://sdk.scdn.co/spotify-player.js"]')) {
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;
      document.body.appendChild(script);
    }

    return () => {
      if (player) player.disconnect();
    };
  }, []); // Run once on mount

  const transferPlaybackToMelo = async (deviceId, token) => {
    try {
      await fetch("https://api.spotify.com/v1/me/player", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          device_ids: [deviceId],
          play: false, 
        }),
      });
      console.log("Successfully transferred playback to Melo!");
    } catch (error) {
      console.error("Failed to transfer playback", error);
    }
  };

  // <-- IMPORTANT: This function handles clicking the player bar!
  const handlePlayerClick = () => {
    if (current_track) {
      navigate(`/song/${current_track.id}`);
    }
  };

  return (
    <div 
      className="player-container" 
      onClick={handlePlayerClick} // <-- IMPORTANT: Added the click listener to the whole bar
      style={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between", 
        padding: "10px 20px", 
        backgroundColor: "#181818", 
        borderTop: "1px solid #282828",
        color: "white",
        position: "fixed",
        bottom: "60px", 
        left: 0,
        width: "100%",
        boxSizing: "border-box",
        zIndex: 1000,
        cursor: current_track ? "pointer" : "default" // Shows a pointer finger if clickable
      }}>
      
      {/* Left side: Track Info */}
      <div className="now-playing" style={{ display: "flex", alignItems: "center", width: "30%" }}>
        {current_track ? (
          <>
            <img 
              src={current_track.album.images[0].url} 
              alt="album cover" 
              style={{ width: "56px", height: "56px", borderRadius: "4px", marginRight: "15px" }}
            />
            <div>
              <div style={{ fontWeight: "bold", fontSize: "14px", marginBottom: "4px" }}>{current_track.name}</div>
              <div style={{ fontSize: "12px", color: "#b3b3b3" }}>{current_track.artists[0].name}</div>
            </div>
          </>
        ) : (
          <div style={{ fontSize: "14px", color: "#b3b3b3" }}>
            {!is_active ? "Waiting for music..." : "No track playing"}
          </div>
        )}
      </div>

      {/* Center: Controls */}
      <div className="player-controls" style={{ display: "flex", alignItems: "center", gap: "20px", width: "80%", justifyContent: "right" }}>
        
        {/* Previous Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation(); // <-- IMPORTANT: Stops the click from opening the page
            if (player) player.previousTrack();
          }}
          style={{ background: "none", border: "none", color: "#b3b3b3", cursor: "pointer" }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
        </button>

        {/* Play/Pause Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation(); // <-- IMPORTANT: Stops the click from opening the page
            if (player) player.togglePlay();
          }}
          style={{ background: "white", border: "none", color: "black", borderRadius: "50%", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
        >
          {is_paused ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: "4px" }}>
              <path d="M8 5v14l11-7z"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          )}
        </button>

        {/* Next Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation(); // <-- IMPORTANT: Stops the click from opening the page
            if (player) player.nextTrack();
          }}
          style={{ background: "none", border: "none", color: "#b3b3b3", cursor: "pointer" }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
        </button>
      </div>

      {/* Right side spacer to keep everything centered */}
      <div style={{ width: "30%" }}></div>
    </div>
  );
};

export default Player;