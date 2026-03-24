import React from "react";
import logo from "../assets/AppLogo.png";
// import "./Search.css";

const Search = () => {
  const recentSearches = [
    { id: 1, title: "Prajina", type: "Artist", img: "https://images.unsplash.com/photo-1516280440502-65f58c3a1311?w=100&q=80", isArtist: true },
    { id: 2, title: "Sabin Rai", type: "Artist", img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100&q=80", isArtist: true },
    { id: 3, title: "Albatross", type: "Album", img: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=100&q=80", isArtist: false },
    { id: 4, title: "Eagle", type: "Album", img: "https://images.unsplash.com/photo-1493225457124-a1a2a5956093?w=100&q=80", isArtist: false },
  ];

  const basedOnLikes = [
    { id: 1, title: "Indie Mix", img: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=300&q=80" },
    { id: 2, title: "House Mix", img: "https://images.unsplash.com/photo-1571266028243-cb40f54cb294?w=300&q=80" },
    { id: 3, title: "Pop Mix", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&q=80" },
    { id: 4, title: "Chill Mix", img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&q=80" },
  ];

  return (
    <div className="search-page-container">
      <header className="page-header">
        <img src={logo} alt="Melo" className="header-logo" />
        <div className="header-icons">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18 16v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5,1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-5 4c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2z"/></svg>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.67 0-5.06-1.1-6.8-2.84.14-1.9 4.14-2.96 6.8-2.96s6.66 1.06 6.8 2.96C17.06 18.9 14.67 20 12 20z"/></svg>
        </div>
      </header>

      {/* Search Bar */}
      <div className="search-bar-wrapper">
        <svg className="search-icon-inside" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <input type="text" className="search-input-dark" />
      </div>

      {/* Recent Searches */}
      <div className="section-header">
        <h3 className="section-title">Recent Searches</h3>
        <button className="view-all-btn">Clear</button>
      </div>
      <div className="recent-list">
        {recentSearches.map((item) => (
          <div key={item.id} className="recent-row">
            <img 
              src={item.img} 
              alt={item.title} 
              className="recent-img" 
              style={{ borderRadius: item.isArtist ? "50%" : "8px" }} 
            />
            <div className="recent-info">
              <div className="recent-title">{item.title}</div>
              <div className="recent-type">{item.type}</div>
            </div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M9.29 15.88L13.17 12 9.29 8.12c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0l4.59 4.59c.39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0-.38-.39-.39-1.03 0-1.42z"/></svg>
          </div>
        ))}
      </div>

      {/* Based on what you like */}
      <h3 className="section-title" style={{ marginTop: "25px", marginBottom: "15px" }}>Based on what you like</h3>
      <div className="mix-grid">
        {basedOnLikes.map((mix) => (
          <div key={mix.id} className="mix-card" style={{ backgroundImage: `url(${mix.img})` }}>
            <div className="mix-overlay">
              <span className="mix-title">{mix.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;