import React, { useState, useEffect } from "react";
import logo from "../assets/AppLogo.png"; 

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  
  // State to track which song is playing and if it's paused
  const [playingUri, setPlayingUri] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Debounced Search Effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim() !== "") {
        performSearch(searchQuery);
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // Fetch from official Spotify Search API
  const performSearch = async (query) => {
    const token = window.localStorage.getItem("access_token");
    if (!token) return;

    try {
      // FIXED: Official Spotify API endpoint with correct ${} syntax
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch search results");
      
      const data = await response.json();
      setSearchResults(data.tracks?.items || []);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  // Play / Pause Toggle Function
  const handlePlayPause = async (trackUri) => {
    const token = window.localStorage.getItem("access_token");
    const deviceId = window.localStorage.getItem("device_id");

    if (!token || !deviceId) {
      alert("Please open your Spotify App and select 'Melo Web Player' first!");
      return;
    }

    try {
      // If we clicked the song that is ALREADY playing...
      if (playingUri === trackUri && isPlaying) {
        // PAUSE IT 
        await fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`, {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsPlaying(false); // Update UI to show Play icon
      } else {
        // PLAY IT
        await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uris: [trackUri] }),
        });
        setPlayingUri(trackUri); // Remember which song is playing
        setIsPlaying(true);      // Update UI to show Pause icon
      }
    } catch (error) {
      console.error("Error toggling playback:", error);
    }
  };

  const handleCategoryClick = (categoryName) => {
    setSearchQuery(categoryName);
  };

  const browseCategories = [
    { name: "Pop", color: "#8d67ab", img: "https://imgs.search.brave.com/rLNiKnxwoWQs7V6YAI6xudq0vxrHD0Bqo0ptkyjDyDg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTIy/NDg0MTE4OS9waG90/by9oYXBweS13b21h/bi1pbi04MHMtc3R5/bGUtb3V0Zml0LWhv/bGRpbmctYm9vbS1i/b3guanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPTBMYU1wZXFm/UHNkNy00dXR0ZkdO/NC11NkZQWFF4emxS/T3JqWVd5QlM4RkE9" },
    { name: "Hip-Hop", color: "#ba5d07", img: "https://i.scdn.co/image/ab67706f000000029bb6af539d072de34548d15c" },
    { name: "Rock", color: "#e1118c", img: "https://i.scdn.co/image/ab67706f00000002fe6d8d1019d5b302213e3730" },
    { name: "Indie", color: "#7358ff", img: "https://i.scdn.co/image/ab67706f000000025f7327d3fdc71af27917adba" },
    { name: "Workout", color: "#777777", img: "https://i.scdn.co/image/ab67706f000000029249b35f23fb596b6f006a15" },
    { name: "Chill", color: "#1e3264", img: "https://imgs.search.brave.com/pHU5Kv4ISwz-nh68fOb38fHUpXN9_betgnrtknmHhro/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/dXBwYmVhdC5pby9p/bWFnZXMtMjAyNS9t/dXNpY19jaGlsbGVk/LXBvcC5qcGc_d2lk/dGg9Mzg0MCZxdWFs/aXR5PTg1" },
  ];

  return (
    <div className="search-page-container">
      <header className="page-header">
        <img src={logo} alt="Melo" className="header-logo" />
        <div className="header-icons">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.67 0-5.06-1.1-6.8-2.84.14-1.9 4.14-2.96 6.8-2.96s6.66 1.06 6.8 2.96C17.06 18.9 14.67 20 12 20z"/>
          </svg>
        </div>
      </header>

      <div className="search-bar-wrapper">
        <svg className="search-icon-inside" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
        <input
          type="text"
          className="search-input-dark"
          placeholder="What do you want to listen to?"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {searchQuery ? (
        <div className="recent-list">
          <h3 style={{ marginBottom: "10px", fontSize: "1.2rem" }}>Top Results</h3>
          {searchResults.map((track) => (
            <div 
              key={track.id} 
              className="recent-row" 
              onClick={() => handlePlayPause(track.uri)} 
              style={{ cursor: "pointer" }}
            >
              <img src={track.album.images[0]?.url} alt={track.name} className="recent-img" />
              <div className="recent-info">
                <div className="recent-title">{track.name}</div>
                <div className="recent-type">Song • {track.artists[0]?.name}</div>
              </div>
              
              {/* Dynamically swap the Play and Pause icons */}
              {playingUri === track.uri && isPlaying ? (
                // Pause Icon
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
              ) : (
                // Play Icon
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              )}

            </div>
          ))}
        </div>
      ) : (
        <>
          <h3 style={{ marginBottom: "15px", fontSize: "1.2rem", marginTop: "20px" }}>Browse all</h3>
          <div className="mix-grid">
            {browseCategories.map((cat, index) => (
              <div 
                key={index} 
                className="mix-card" 
                style={{ 
                  backgroundColor: cat.color,
                  position: "relative",
                  overflow: "hidden",
                  height: "120px", 
                  borderRadius: "8px",
                  cursor: "pointer"
                }}
                onClick={() => handleCategoryClick(cat.name)}
              >
                <span style={{ 
                  position: "absolute", 
                  top: "15px", 
                  left: "15px", 
                  color: "white", 
                  fontWeight: "bold", 
                  fontSize: "1.2rem",
                  zIndex: 2 
                }}>
                  {cat.name}
                </span>
                <img 
                  src={cat.img} 
                  alt={cat.name} 
                  style={{
                    width: "80px",
                    height: "80px",
                    position: "absolute",
                    bottom: "-10px",
                    right: "-15px",
                    transform: "rotate(25deg)",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.5)"
                  }}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Search;