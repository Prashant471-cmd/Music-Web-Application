import React from "react";
// import "./Dashboard.css";
// import logo from "../assets/AppLogo.png"; 

const Dashboard = () => {
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
            {/* <img src={logo} alt="Melo" style={{ height: "35px" }} /> */}
            <h1 style={{ margin: 0, fontSize: "24px", letterSpacing: "-1px" }}>melo</h1>
          </div>
          <div className="header-icons">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
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