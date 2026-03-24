import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/AppLogo.png";
// import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
    
  const playlists = [
    { id: 1, title: "T.N.T.", likes: "600 likes", img: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=150&q=80" },
    { id: 2, title: "Snow (Hey Oh)", likes: "100 likes", img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150&q=80" },
    { id: 3, title: "Hotel California", likes: "400 likes", img: "https://images.unsplash.com/photo-1493225457124-a1a2a5956093?w=150&q=80" },
    { id: 4, title: "Parelima", likes: "200 likes", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=150&q=80" },
  ];

  return (
    <div className="profile-container">
      {/* Header */}
      <header className="page-header">
        <img src={logo} alt="Melo" className="header-logo" 
            onClick={() => navigate("/dashboard")}/>
        <div className="header-icons">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18 16v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5,1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-5 4c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2z"/></svg>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.67 0-5.06-1.1-6.8-2.84.14-1.9 4.14-2.96 6.8-2.96s6.66 1.06 6.8 2.96C17.06 18.9 14.67 20 12 20z"/></svg>
        </div>
      </header>

      {/* User Info */}
      <div className="profile-info">
        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80" alt="Shital Shahi" className="profile-pic" />
        <h2 className="profile-name">Shital Shahi</h2>
        <button className="edit-profile-btn">Edit profile</button>
        <div className="profile-stats">
          <span>500 Following</span>
          <span className="dot">•</span>
          <span>500 Followers</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="profile-tabs">
        <span className="tab active">Playlists</span>
        <span className="tab">Downloaded</span>
        <span className="tab">Liked</span>
      </div>

      {/* Playlist List */}
      <div className="profile-list">
        {playlists.map((item) => (
          <div key={item.id} className="list-row">
            <img src={item.img} alt={item.title} className="list-image" />
            <div className="list-text">
              <div className="list-title">{item.title}</div>
              <div className="list-subtitle">{item.likes}</div>
            </div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M9.29 15.88L13.17 12 9.29 8.12c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0l4.59 4.59c.39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0-.38-.39-.39-1.03 0-1.42z"/>
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;