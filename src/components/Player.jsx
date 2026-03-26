import React, { useState, useEffect } from "react";
// import "./Player.css";

const Player = () => {
  const [player, setPlayer] = useState(undefined);
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [current_track, setTrack] = useState(null);

  useEffect(() => {
    const token = window.localStorage.getItem("access_token");
    if (!token) return;

    // 1. INJECT THE SPOTIFY SDK SCRIPT dynamically
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    // 2. INITIALIZE PLAYER ONCE THE SCRIPT IS READY
    window.onSpotifyWebPlaybackSDKReady = () => {
      const spotifyPlayer = new window.Spotify.Player({
        name: "Melo Web Player",
        getOAuthToken: (cb) => { cb(token); },
        volume: 0.5,
      });

      setPlayer(spotifyPlayer);

      // 3. LISTEN FOR READY STATE AND AUTO-TRANSFER
      spotifyPlayer.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        window.localStorage.setItem("device_id", device_id);
        
        // Force Spotify to switch to this newly created web device
        transferPlaybackToMelo(device_id, token);
      });

      spotifyPlayer.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      // Update state when track changes or pauses
      spotifyPlayer.addListener("player_state_changed", (state) => {
        if (!state) return;

        setTrack(state.track_window.current_track);
        setPaused(state.paused);

        // Check if playback is currently active on this device
        spotifyPlayer.getCurrentState().then(state => { 
          (!state) ? setActive(false) : setActive(true);
        });
      });

      spotifyPlayer.connect();
    };
  }, []);

  // 4. THE AUTO-TRANSFER FUNCTION
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
          play: false, // Changes active device without auto-playing. Set to true if you want music to auto-play!
        }),
      });
      console.log("Successfully transferred playback to Melo!");
    } catch (error) {
      console.error("Failed to transfer playback", error);
    }
  };

  // 5. FALLBACK UI
  if (!is_active) { 
    return (
      <div className="player-container fallback">
        <p>Connecting to Melo Web Player... 🎧</p>
      </div>
    );
  }

  // 6. MAIN PLAYER UI
  return (
    <div className="player-container">
      {/* Left side: Track Info */}
      <div className="now-playing">
        {current_track?.album?.images?.[0]?.url && (
          <img 
            src={current_track.album.images[0].url} 
            className="now-playing__cover" 
            alt="album cover" 
          />
        )}
        <div className="now-playing__info">
          <div className="now-playing__name">{current_track?.name}</div>
          <div className="now-playing__artist">{current_track?.artists?.[0]?.name}</div>
        </div>
      </div>

      {/* Center: Controls */}
      <div className="player-controls">
        <button className="btn-spotify" onClick={() => player.previousTrack()}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
          </svg>
        </button>

        <button className="btn-spotify play-btn" onClick={() => player.togglePlay()}>
          {is_paused ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{marginLeft: "4px"}}>
              <path d="M8 5v14l11-7z"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          )}
        </button>

        <button className="btn-spotify" onClick={() => player.nextTrack()}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
          </svg>
        </button>
      </div>

      {/* Right side spacer for flexbox alignment */}
      <div className="player-spacer"></div>
    </div>
  );
};

export default Player;