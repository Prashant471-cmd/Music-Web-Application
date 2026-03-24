import React from "react";
import { useNavigate } from "react-router-dom";
// import "./Dashboard.css";
// Importing the exact same way you did in Welcome.jsx
import logo from "../assets/AppLogo.png"; 
import getStartPage from "../assets/LoginPic.png";

const Dashboard = () => {

  const navigate = useNavigate();

  // --- Placeholder Data ---
  const recentlyPlayed = [
    { id: 1, img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&q=80" },
    { id: 2, img: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=300&q=80" },
    { id: 3, img: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&q=80" },
    { id: 4, img: "https://images.unsplash.com/photo-1493225457124-a1a2a5956093?w=300&q=80" },
  ];

  const forYou = [
    { id: 1, img: "https://images.unsplash.com/photo-1619983081563-430f63602796?w=500&q=80" },
    { id: 2, img: "https://images.unsplash.com/photo-1516280440502-65f58c3a1311?w=500&q=80" },
  ];

  const popularSongs = [
    { id: 1, title: "Perfect", artist: "Ed Sheeran", img: "https://images.unsplash.com/photo-1493225457124-a1a2a5956093?w=150&q=80" },
    { id: 2, title: "Timi Nai Hau", artist: "Sabin Rai", img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150&q=80" },
    { id: 3, title: "Bachau", artist: "Albatross", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=150&q=80" },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        
        {/* Header */}
        <header className="dashboard-header">
          <div className="dashboard-logo">
            {/* Using the image instead of text */}
            <img src={logo} alt="Melo" style={{ width: "90px", objectFit: "contain" }} />
          </div>
          
          <div className="header-icons">
            {/* Notification Bell Icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 16v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5,1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-5 4c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2z"/>
            </svg>
            
            {/* Profile Circle Icon */}
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"
            onClick={() => navigate("/profile")}>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.67 0-5.06-1.1-6.8-2.84.14-1.9 4.14-2.96 6.8-2.96s6.66 1.06 6.8 2.96C17.06 18.9 14.67 20 12 20z"/>
            </svg>
          </div>
        </header>

        {/* Greeting */}
        <h2 className="greeting">Good afternoon, dear!</h2>

        {/* Pick up where you left */}
        <section className="section-container">
          <div className="section-header">
            <h3 className="section-title">Pick up where you left</h3>
            <button className="view-all-btn">View all</button>
          </div>
          <div className="scroll-row">
            {recentlyPlayed.map((item) => (
              <div key={item.id} className="card-square">
                <img src={item.img} alt="Recently played" />
              </div>
            ))}
          </div>
        </section>

        {/* For you */}
        <section className="section-container">
          <div className="section-header">
            <h3 className="section-title">For you</h3>
            <button className="view-all-btn">View all</button>
          </div>
          <div className="scroll-row">
            {forYou.map((item) => (
              <div key={item.id} className="card-wide">
                <img src={item.img} alt="For you" />
              </div>
            ))}
          </div>
        </section>

        {/* Popular Songs */}
        <section className="section-container">
          <h3 className="section-title" style={{ marginBottom: "15px" }}>Popular songs</h3>
          <div className="popular-list">
            {popularSongs.map((song) => (
              <div key={song.id} className="song-row">
                <img src={song.img} alt={song.title} className="song-image" />
                <div className="song-info">
                  <div className="song-title">{song.title}</div>
                  <div className="song-artist">{song.artist}</div>
                </div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Dashboard;