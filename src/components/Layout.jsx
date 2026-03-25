import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Player from "./Player";
// import "./Layout.css"; // We need this for the spacing!

const Layout = () => {
  return (
    <div className="app-layout">
      {/* The Outlet is where your nested routes (Dashboard, Search, etc.) will render.
        It sits inside a scrollable main content area.
      */}
      <div className="main-content">
        <Outlet />
      </div>

      {/* The Global Player floats right above the Bottom Navigation.
        It stays persistent across all pages.
      */}
      <div className="global-player-wrapper">
        <Player />
      </div>

      {/* The Bottom Navigation Bar.
        Anchored to the very bottom of the screen.
      */}
      <Footer />
    </div>
  );
};

export default Layout;