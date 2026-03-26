import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/AppLogo.png";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userPlaylists, setUserPlaylists] = useState([]); // <-- State for real playlists

  useEffect(() => {
    const token = window.localStorage.getItem("access_token");
    
    // If there's no token, kick them to the login screen
    if (!token) {
      navigate("/");
      return;
    }

    // 1. Fetch Real User Profile
    const fetchUserProfile = async () => {
      try {
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
        const response = await fetch("https://api.spotify.com/v1/me/playlists?limit=10", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Failed to fetch playlists");
        const data = await response.json();
        setUserPlaylists(data.items); // Save the real playlists!
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    // Run both fetches when the page loads
    fetchUserProfile();
    fetchUserPlaylists();
  }, [navigate]);

  // Logout Function
  const handleLogout = () => {
    window.localStorage.removeItem("access_token");
    window.localStorage.removeItem("device_id");
    navigate("/");
  };

  return (
    <div className="profile-container">
      {/* Header */}
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

      {/* User Info */}
      <div className="profile-info">
        <img 
          src={user?.images?.[1]?.url || user?.images?.[0]?.url || "https://via.placeholder.com/150"} 
          alt={user?.display_name || "User"} 
          className="profile-pic" 
        />
        <h2 className="profile-name">{user ? user.display_name : "Loading..."}</h2>
        
        <button 
          className="edit-profile-btn" 
          onClick={handleLogout}
          style={{ borderColor: "#e91429", color: "#e91429", cursor: "pointer" }} 
        >
          Log out
        </button>
        
        <div className="profile-stats">
          <span>{user?.followers?.total || 0} Followers</span>
          <span className="dot">•</span>
          <span>{user?.product === "premium" ? "Premium" : "Free"} User</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="profile-tabs">
        <span className="tab active">Playlists</span>
        <span className="tab">Downloaded</span>
        <span className="tab">Liked</span>
      </div>

      {/* Real Playlist List */}
      <div className="profile-list">
        {userPlaylists.length > 0 ? (
          userPlaylists.map((playlist) => (
            <div 
              key={playlist.id} 
              className="list-row"
              style={{ cursor: "pointer" }}
              // In the future, this onClick will open the playlist details!
              // onClick={() => navigate(`/playlist/${playlist.id}`)}
            >
              <img 
                src={playlist.images?.[0]?.url || "https://via.placeholder.com/150"} 
                alt={playlist.name} 
                className="list-image" 
              />
              <div className="list-text">
                <div className="list-title">{playlist.name}</div>
                {/* Real track count and playlist owner */}
                <div className="list-subtitle">
                  {playlist.tracks?.total || 0} tracks • By {playlist.owner?.display_name}
                </div>
              </div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M9.29 15.88L13.17 12 9.29 8.12c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0l4.59 4.59c.39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0-.38-.39-.39-1.03 0-1.42z"/>
              </svg>
            </div>
          ))
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