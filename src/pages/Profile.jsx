import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/AppLogo.png";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userPlaylists, setUserPlaylists] = useState([]); 

  useEffect(() => {
    const token = window.localStorage.getItem("access_token");
    
    if (!token) {
      navigate("/");
      return;
    }

    // 1. Fetch Real User Profile
    const fetchUserProfile = async () => {
      try {
        // FIXED: Pointing to the real Spotify API
        const response = await fetch("https://api.spotify.com/v1/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Failed to fetch profile");
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // 2. Fetch Real User Playlists
    const fetchUserPlaylists = async () => {
      try {
        // FIXED: Pointing to the real Spotify API
        const response = await fetch("https://api.spotify.com/v1/me/playlists", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Failed to fetch playlists (Check your scopes!)");
        const data = await response.json();
        setUserPlaylists(data.items); 
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchUserProfile();
    fetchUserPlaylists();
  }, [navigate]);

  const handleLogout = () => {
    window.localStorage.removeItem("access_token");
    window.localStorage.removeItem("device_id");
    navigate("/");
  };

  return (
    <div className="profile-container" style={{ padding: "20px", color: "white", backgroundColor: "black", minHeight: "100vh", paddingBottom: "100px" }}>
      
      {/* Header */}
      <header className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <img 
          src={logo} 
          alt="Melo" 
          className="header-logo" 
          onClick={() => navigate("/dashboard")}
          style={{ width: "90px", cursor: "pointer", objectFit: "contain" }}
        />
        <div className="header-icons" style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          {/* Bell Icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 16v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5,1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-5 4c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2z"/>
          </svg>
          {/* Top Right Mini Profile Icon */}
          <div style={{ width: "28px", height: "28px", borderRadius: "50%", backgroundColor: "#333", display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
            {user?.images?.[0]?.url ? (
              <img src={user.images[0].url} alt="mini-profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.67 0-5.06-1.1-6.8-2.84.14-1.9 4.14-2.96 6.8-2.96s6.66 1.06 6.8 2.96C17.06 18.9 14.67 20 12 20z"/>
              </svg>
            )}
          </div>
        </div>
      </header>

      {/* User Info Section (Centered) */}
      <div className="profile-info" style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "30px" }}>
        <img 
          src={user?.images?.[1]?.url || user?.images?.[0]?.url || "https://i.scdn.co/image/ab6761610000e5eb55d39ab9c21d506aa52f7021"} 
          alt={user?.display_name || "User"} 
          className="profile-pic" 
          style={{ width: "150px", height: "150px", borderRadius: "50%", objectFit: "cover", marginBottom: "15px", boxShadow: "0 4px 15px rgba(0,0,0,0.5)" }}
        />
        <h2 className="profile-name" style={{ fontSize: "1.8rem", marginBottom: "10px" }}>
          {user ? user.display_name : "Loading..."}
        </h2>
        
        <button 
          className="edit-profile-btn" 
          onClick={handleLogout}
          style={{ padding: "8px 20px", borderRadius: "20px", backgroundColor: "transparent", border: "1px solid #e91429", color: "#e91429", cursor: "pointer", fontWeight: "bold", marginBottom: "15px" }} 
        >
          Log out
        </button>
        
        <div className="profile-stats" style={{ color: "#b3b3b3", fontSize: "0.9rem", display: "flex", gap: "10px", alignItems: "center" }}>
          <span>{user?.followers?.total || 0} Followers</span>
          <span className="dot">•</span>
          <span>{user?.product === "premium" ? "Premium" : "Free"} User</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="profile-tabs" style={{ display: "flex", justifyContent: "space-around", borderBottom: "1px solid #333", marginBottom: "20px", paddingBottom: "10px" }}>
        <span className="tab active" style={{ fontWeight: "bold", borderBottom: "2px solid white", paddingBottom: "10px", cursor: "pointer" }}>Playlists</span>
        <span className="tab" style={{ color: "#b3b3b3", cursor: "pointer" }}>Downloaded</span>
        <span className="tab" style={{ color: "#b3b3b3", cursor: "pointer" }}>Liked</span>
      </div>

      {/* Real Playlist List */}
      <div className="profile-list" style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {userPlaylists.length > 0 ? (
          userPlaylists.map((playlist) => {
            if (!playlist) return null; // Safety check
            
            return (
              <div 
                key={playlist.id} 
                className="list-row"
                style={{ display: "flex", alignItems: "center", cursor: "pointer", gap: "15px" }}
              >
                <img 
                  // Grabs the playlist cover, or uses a fallback placeholder if none exists
                  src={playlist.images?.[0]?.url || "https://i.scdn.co/image/ab67706f0000000206121f1bb5bb2678b87ce3de"} 
                  alt={playlist.name} 
                  className="list-image" 
                  style={{ width: "60px", height: "60px", borderRadius: "4px", objectFit: "cover" }}
                />
                <div className="list-text" style={{ flexGrow: 1 }}>
                  <div className="list-title" style={{ fontWeight: "bold", fontSize: "1rem", marginBottom: "4px" }}>
                    {playlist.name}
                  </div>
                  <div className="list-subtitle" style={{ fontSize: "0.8rem", color: "#b3b3b3" }}>
                    {playlist.tracks?.total || 0} tracks • By {playlist.owner?.display_name || "Spotify"}
                  </div>
                </div>
                {/* Arrow Icon */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#b3b3b3">
                  <path d="M9.29 15.88L13.17 12 9.29 8.12c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0l4.59 4.59c.39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0-.38-.39-.39-1.03 0-1.42z"/>
                </svg>
              </div>
            );
          })
        ) : (
          <p style={{ color: "#b3b3b3", textAlign: "center", marginTop: "20px" }}>
            No playlists found yet!
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;