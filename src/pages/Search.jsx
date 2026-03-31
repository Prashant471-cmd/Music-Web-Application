import React, { useState, useEffect } from "react";
import logo from "../assets/AppLogo.png"; 
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  
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

  // Fetch from official Spotify Search API for Tracks, Artists, AND Albums
  const performSearch = async (query) => {
    const token = window.localStorage.getItem("access_token");
    if (!token) return;

    try {
      // Added type=track,artist,album so we get all three!
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track,artist,album&limit=4`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch search results");
      
      const data = await response.json();
      
      // Combine Tracks, Artists, and Albums into one single list
      const combinedResults = [
        ...(data.artists?.items || []).map(item => ({ ...item, searchType: "Artist" })),
        ...(data.albums?.items || []).map(item => ({ ...item, searchType: "Album" })),
        ...(data.tracks?.items || []).map(item => ({ ...item, searchType: "Song" }))
      ];

      // Keep the top 8 results so the list isn't too long
      setSearchResults(combinedResults.slice(0, 8));
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  // Navigate to different pages based on what the user clicked
  const handleResultClick = (item) => {
    if (item.searchType === "Artist") {
      navigate(`/artist/${item.id}`);
    } else if (item.searchType === "Album") {
      navigate(`/album/${item.id}`);
    } else if (item.searchType === "Song") {
      // If it's a song, we route to the album it belongs to
      navigate(`/album/${item.album.id}`); 
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
          {searchResults.map((item, index) => {
            
            // Songs get album art, Artists/Albums get their direct image
            const imageUrl = item.searchType === "Song" 
              ? item.album?.images[0]?.url 
              : item.images?.[0]?.url;

            return (
              <div 
                key={`${item.id}-${index}`} 
                className="recent-row" 
                onClick={() => handleResultClick(item)} 
                style={{ cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "15px" }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img 
                    src={imageUrl} 
                    alt={item.name} 
                    className="recent-img" 
                    style={{ 
                      width: "50px", 
                      height: "50px", 
                      // Makes Artists circular, just like in your screenshot!
                      borderRadius: item.searchType === "Artist" ? "50%" : "8px", 
                      marginRight: "15px",
                      objectFit: "cover"
                    }} 
                  />
                  <div className="recent-info">
                    <div className="recent-title" style={{ fontWeight: "bold", fontSize: "1rem" }}>{item.name}</div>
                    <div className="recent-type" style={{ fontSize: "0.8rem", color: "#b3b3b3" }}>
                      {item.searchType} {item.searchType === "Song" && `• ${item.artists[0]?.name}`}
                    </div>
                  </div>
                </div>
                
                {/* Replaced Play/Pause buttons with the Forward Arrow icon */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                </svg>

              </div>
            );
          })}
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