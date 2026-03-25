import React from "react";
import { NavLink } from "react-router-dom";
// import "./BottomNav.css"; // Import your isolated styles

const BottomNav = () => {
  return (
    <nav className="melo-bottom-nav">
      {/* Home Button */}
      <NavLink 
        to="/dashboard" 
        className={({ isActive }) => (isActive ? "melo-nav-item melo-active" : "melo-nav-item")}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
        <span className="melo-nav-text">Home</span>
      </NavLink>

      {/* Search Button */}
      <NavLink 
        to="/search" 
        className={({ isActive }) => (isActive ? "melo-nav-item melo-active" : "melo-nav-item")}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
        </svg>
        <span className="melo-nav-text">Search</span>
      </NavLink>

      {/* Library Button */}
      <NavLink 
        to="/library" 
        className={({ isActive }) => (isActive ? "melo-nav-item melo-active" : "melo-nav-item")}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z" />
        </svg>
        <span className="melo-nav-text">Library</span>
      </NavLink>

      {/* Profile Button */}
      <NavLink 
        to="/profile" 
        className={({ isActive }) => (isActive ? "melo-nav-item melo-active" : "melo-nav-item")}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
        <span className="melo-nav-text">Profile</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;