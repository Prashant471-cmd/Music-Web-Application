import React, { useState, useEffect } from "react";
import logo from "../assets/AppLogo.png";
import { useNavigate } from "react-router-dom";
// import "./Library.css"; // Make sure to uncomment this when you use it!

const Library = () => {
  const navigate = useNavigate();
  
  // State for our real Spotify data
  const [savedAlbums, setSavedAlbums] = useState([]);
  const [heroTrack, setHeroTrack] = useState(null);

  useEffect(() => {
    const token = window.localStorage.getItem("access_token");
    
    // Security check
    if (!token) {
      navigate("/");
      return;
    }

    const fetchLibraryData = async () => {
      try {
        // 1. Fetch user's #1 Top Track for the Hero Card (REAL API)
        const topRes = await fetch(`https://api.spotify.com/v1/me/top/tracks?limit=1`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (topRes.ok) {
          const topData = await topRes.json();
          setHeroTrack(topData.items[0]);
        } else {
          console.warn("Could not fetch top tracks. Check your 'user-top-read' scope!");
        }

        // 2. Fetch user's Saved Albums for the Grid (REAL API)
        const albumRes = await fetch(`https://api.spotify.com/v1/me/albums?limit=20`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (albumRes.ok) {
          const albumData = await albumRes.json();
          setSavedAlbums(albumData.items);
        } else {
          console.warn("Could not fetch saved albums. Check your 'user-library-read' scope!");
        }
      } catch (error) {
        console.error("Error fetching library data:", error);
      }
    };

    fetchLibraryData();
  }, [navigate]);

  // Play function for the Hero Card
  const playHeroTrack = async () => {
    if (!heroTrack) return;
    const token = window.localStorage.getItem("access_token");
    const deviceId = window.localStorage.getItem("device_id");

    if (!deviceId) {
      alert("Please wait for the player to connect!");
      return;
    }

    try {
      // FIXED: Real Spotify Play API with the correct ${deviceId} syntax
      await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uris: [heroTrack.uri] }),
      });
    } catch (error) {
      console.error("Error playing hero track:", error);
    }
  };

  return (
    <div className="lib-page-container" style={{ padding: "20px", color: "white", backgroundColor: "black", minHeight: "100vh", paddingBottom: "100px" }}>
      
      {/* Header */}
      <header className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <img 
          src={logo} 
          alt="Melo" 
          className="header-logo" 
          onClick={() => navigate("/dashboard")}
          style={{ width: "90px", cursor: "pointer", objectFit: "contain" }}
        />
        <div className="header-icons" onClick={() => navigate("/profile")} style={{ display: "flex", gap: "15px", cursor: "pointer", alignItems: "center" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 16v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5,1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-5 4c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2z"/>
          </svg>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.67 0-5.06-1.1-6.8-2.84.14-1.9 4.14-2.96 6.8-2.96C17.06 18.9 14.67 20 12 20z"/>
          </svg>
        </div>
      </header>

      <h2 className="lib-main-title" style={{ fontSize: "1.8rem", marginBottom: "20px" }}>Your Library</h2>

      {/* Real Hero Card (Top Track) */}
      {heroTrack && (
        <div 
          className="lib-hero-card" 
          style={{ 
            backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url(${heroTrack.album.images[0]?.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "12px",
            padding: "30px",
            minHeight: "200px",
            display: "flex",
            alignItems: "flex-end",
            marginBottom: "30px",
            position: "relative"
          }}
        >
          <div className="lib-hero-overlay" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", width: "100%" }}>
            <div className="lib-hero-text">
              <p style={{ margin: 0, fontSize: "0.9rem", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px" }}>On Repeat</p>
              <h3 style={{ margin: "5px 0 0 0", fontSize: "2rem" }}>{heroTrack.name}</h3>
            </div>
            
            {/* Play Button */}
            <div 
              className="lib-hero-play" 
              onClick={playHeroTrack} 
              style={{ cursor: "pointer", zIndex: 10, backgroundColor: "#1db954", width: "50px", height: "50px", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", transition: "transform 0.2s" }}
              onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"}
              onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="black"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            </div>
          </div>
        </div>
      )}

      {/* Real Grid Cards (Saved Albums) */}
      <div className="lib-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "20px" }}>
        {savedAlbums.length > 0 ? (
          savedAlbums.map((item) => (
            <div 
              key={item.album.id} 
              className="lib-card" 
              style={{ 
                backgroundImage: `url(${item.album.images[0]?.url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "8px",
                aspectRatio: "1 / 1", // Keeps them perfectly square
                cursor: "pointer",
                position: "relative",
                overflow: "hidden"
              }}
              // onClick={() => navigate(`/album/${item.album.id}`)}
            >
              <div 
                className="lib-card-overlay" 
                style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "10px", background: "linear-gradient(transparent, rgba(0,0,0,0.9))" }}
              >
                <span className="lib-card-title" style={{ fontSize: "0.9rem", fontWeight: "bold" }}>{item.album.name}</span>
              </div>
            </div>
          ))
        ) : (
          <p style={{ color: "#b3b3b3", marginTop: "20px", gridColumn: "1 / -1" }}>No saved albums found. Go like some music!</p>
        )}
      </div>
    </div>
  );
};

export default Library;