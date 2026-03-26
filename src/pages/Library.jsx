import React, { useState, useEffect } from "react";
import logo from "../assets/AppLogo.png";
import { useNavigate } from "react-router-dom";
// import "./Library.css";

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
        // 1. Fetch user's #1 Top Track for the Hero Card
        const topRes = await fetch(`https://api.spotify.com/v1$/me/top/tracks?limit=1`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (topRes.ok) {
          const topData = await topRes.json();
          setHeroTrack(topData.items[0]);
        }

        // 2. Fetch user's Saved Albums for the Grid
        const albumRes = await fetch(`https://api.spotify.com/v1$/me/albums?limit=6`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (albumRes.ok) {
          const albumData = await albumRes.json();
          setSavedAlbums(albumData.items);
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
      await fetch(`https://api.spotify.com/v1/me/player/play?device_id=$${deviceId}`, {
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
    <div className="lib-page-container">
      <header className="page-header">
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

      <h2 className="lib-main-title">Your Library</h2>

      {/* Real Hero Card (Top Track) */}
      {heroTrack && (
        <div 
          className="lib-hero-card" 
          style={{ 
            backgroundImage: `url(${heroTrack.album.images[0]?.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div className="lib-hero-overlay">
            <div className="lib-hero-text">
              <p>On Repeat</p>
              <h3>{heroTrack.name}</h3>
            </div>
            <div className="lib-hero-play" onClick={playHeroTrack} style={{ cursor: "pointer", zIndex: 10 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            </div>
          </div>
        </div>
      )}

      {/* Real Grid Cards (Saved Albums) */}
      <div className="lib-grid">
        {savedAlbums.length > 0 ? (
          savedAlbums.map((item) => (
            <div 
              key={item.album.id} 
              className="lib-card" 
              style={{ 
                backgroundImage: `url(${item.album.images[0]?.url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                cursor: "pointer"
              }}
              // In the future, this onClick will navigate to the Album details page!
              // onClick={() => navigate(`/album/${item.album.id}`)}
            >
              <div className="lib-card-overlay">
                <span className="lib-card-title">{item.album.name}</span>
              </div>
            </div>
          ))
        ) : (
          <p style={{ color: "#b3b3b3", marginTop: "20px" }}>No saved albums found. Go like some music!</p>
        )}
      </div>
    </div>
  );
};

export default Library;