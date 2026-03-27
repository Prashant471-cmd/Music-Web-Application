import React, { useState, useEffect } from "react";
// import "./Search.css";
import logo from "../assets/AppLogo.png";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [categories, setCategories] = useState([]); // NEW: State for real categories

  // 1. Fetch Real Spotify Categories on Component Mount
  useEffect(() => {
    const fetchCategories = async () => {
      const token = window.localStorage.getItem("access_token");
      if (!token) return;

      try {
        // Official Spotify endpoint for Browse Categories
        const response = await fetch("https://api.spotify.com/v1/browse/categories?limit=20", {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.ok) {
          const data = await response.json();
          setCategories(data.categories.items); // Save the real categories to state
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []); // Empty array means this only runs once when the page loads

  // 2. Debounced Search Effect
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

  // 3. Fetch Real Search Results
  const performSearch = async (query) => {
    const token = window.localStorage.getItem("access_token");
    if (!token) return;

    try {
      // Upgraded to official API with the correct ${} syntax
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

  // 4. Play Song Function
  const playSong = async (trackUri) => {
    const token = window.localStorage.getItem("access_token");
    const deviceId = window.localStorage.getItem("device_id");

    if (!token || !deviceId) {
      alert("Please ensure the Melo Web Player is active!");
      return;
    }

    try {
      // Upgraded to official API with the correct ${} syntax
      await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uris: [trackUri] }),
      });
    } catch (error) {
      console.error("Error playing song:", error);
    }
  };

  // Helper function to generate random background colors for category cards
  const getRandomColor = () => {
    const colors = ["#E13300", "#7358FF", "#1E3264", "#E8115B", "#8D67AB", "#148A08", "#E1118C", "#8C67AB"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="search-page-container">
      
      {/* Page Header */}
      <header className="page-header">
        <img src={logo} alt="Melo" className="header-logo" />
        <div className="header-icons">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.67 0-5.06-1.1-6.8-2.84.14-1.9 4.14-2.96 6.8-2.96s6.66 1.06 6.8 2.96C17.06 18.9 14.67 20 12 20z"/>
          </svg>
        </div>
      </header>

      {/* Search Bar Wrapper */}
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

      {/* Dynamic Content: Show Results OR Browse Grid */}
      {searchQuery ? (
        <div className="recent-list">
          <h3 style={{ marginBottom: "10px", fontSize: "1.2rem" }}>Top Results</h3>
          {searchResults.map((track) => (
            <div key={track.id} className="recent-row" onClick={() => playSong(track.uri)} style={{ cursor: "pointer" }}>
              <img src={track.album.images[0]?.url} alt={track.name} className="recent-img" />
              <div className="recent-info">
                <div className="recent-title">{track.name}</div>
                <div className="recent-type">Song • {track.artists[0]?.name}</div>
              </div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>
          ))}
        </div>
      ) : (
        <>
          <h3 style={{ marginBottom: "15px", fontSize: "1.2rem", marginTop: "20px" }}>Browse all</h3>
          <div className="mix-grid">
            {categories.map((cat) => (
              <div 
                key={cat.id} 
                className="mix-card" 
                style={{ 
                  backgroundColor: getRandomColor(),
                  position: "relative", 
                  overflow: "hidden",
                  height: "120px", /* Make sure cards have height */
                  borderRadius: "8px",
                  cursor: "pointer"
                }}
              >
                {/* Text in top left */}
                <div style={{ position: "absolute", top: "15px", left: "15px", zIndex: 2 }}>
                  <span style={{ color: "white", fontWeight: "bold", fontSize: "1.1rem" }}>
                    {cat.name}
                  </span>
                </div>
                
                {/* Image rotated in bottom right (Spotify Style) */}
                {cat.icons[0] && (
                  <img 
                    src={cat.icons[0].url} 
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
                )}
              </div>
            ))}
          </div>
        </>
      )}

    </div>
  );
};

export default Search;