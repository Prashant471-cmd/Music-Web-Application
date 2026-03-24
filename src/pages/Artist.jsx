import React from "react";
import logo from "../assets/AppLogo.png";
// import "./Artist.css";

const Artist = () => {
  const topHits = [
    { id: 1, title: "Perfect", artist: "Ed Sheeran", img: "https://images.unsplash.com/photo-1493225457124-a1a2a5956093?w=150&q=80" },
    { id: 2, title: "Timi Nai Hau", artist: "Sabin Rai", img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150&q=80" },
    { id: 3, title: "Bachau", artist: "Albatross", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=150&q=80" },
  ];

  return (
    <div className="artist-container">
      {/* Hero Section with Background */}
      <div className="artist-hero">
        <div className="hero-overlay"></div>
        <header className="page-header transparent">
          <img src={logo} alt="Melo" className="header-logo" />
          <div className="header-icons">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18 16v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5,1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-5 4c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2z"/></svg>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.67 0-5.06-1.1-6.8-2.84.14-1.9 4.14-2.96 6.8-2.96s6.66 1.06 6.8 2.96C17.06 18.9 14.67 20 12 20z"/></svg>
          </div>
        </header>
        
        <div className="artist-hero-info">
          <h1 className="artist-name">Prajina</h1>
          <p className="monthly-listeners">3,125,354 monthly listeners</p>
          <div className="artist-actions">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            <span style={{ fontSize: '24px', fontWeight: 'bold' }}>...</span>
          </div>
          {/* Big Play Button */}
          <div className="big-play-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          </div>
        </div>
      </div>

      {/* Track Lists */}
      <div className="artist-content">
        <h2 className="section-heading">Top hits</h2>
        <div className="track-list">
          {topHits.map(track => (
            <div key={track.id} className="list-row">
              <img src={track.img} alt={track.title} className="list-image" />
              <div className="list-text">
                <div className="list-title">{track.title}</div>
                <div className="list-subtitle">{track.artist}</div>
              </div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Artist;