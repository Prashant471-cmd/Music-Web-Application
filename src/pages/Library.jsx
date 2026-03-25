import React from "react";
import logo from "../assets/AppLogo.png";
import { useNavigate } from "react-router-dom";
// import "./Library.css";

const Library = () => {
  const navigate = useNavigate();
  const libraryMixes = [
    { id: 1, title: "Gym\nTime", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&q=80" },
    { id: 2, title: "90s\nTechno", img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&q=80" },
    { id: 3, title: "Deep\nFocus", img: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=300&q=80" },
    { id: 4, title: "Beach\nVibes", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&q=80" },
    { id: 5, title: "Kids\nParty", img: "https://images.unsplash.com/photo-1530103043960-ef38714abb15?w=300&q=80" },
    { id: 6, title: "Folk\nMusic", img: "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=300&q=80" },
  ];

  return (
    <div className="lib-page-container">
      <header className="page-header">
        <img src={logo} alt="Melo" className="header-logo" 
        onClick={() => navigate("/dashboard")}/>
        <div className="header-icons"
        onClick={() => navigate("/profile")}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18 16v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5,1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-5 4c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2z"/></svg>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.67 0-5.06-1.1-6.8-2.84.14-1.9 4.14-2.96 6.8-2.96s6.66 1.06 6.8 2.96C17.06 18.9 14.67 20 12 20z"/></svg>
        </div>
      </header>

      <h2 className="lib-main-title">Your Library</h2>

      {/* Hero Card */}
      <div className="lib-hero-card">
        <div className="lib-hero-overlay">
          <div className="lib-hero-text">
            <p>Your Music</p>
            <h3>On Repeat</h3>
          </div>
          <div className="lib-hero-play">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          </div>
        </div>
      </div>

      {/* Grid Cards */}
      <div className="lib-grid">
        {libraryMixes.map((mix) => (
          <div key={mix.id} className="lib-card" style={{ backgroundImage: `url(${mix.img})` }}>
            <div className="lib-card-overlay">
              <span className="lib-card-title">{mix.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Library;