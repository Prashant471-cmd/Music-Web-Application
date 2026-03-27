import React from "react";
import { Outlet } from "react-router-dom";
import Player from "./Player";
import BottomNav from "./BottomNav";
// We removed the Footer import entirely since BottomNav does everything better!

const Layout = () => {
  return (
    <div className="layout-wrapper" style={{ paddingBottom: "140px", minHeight: "100vh" }}>
      
      {/* 1. THE MAIN PAGE CONTENT (Dashboard, Search, etc.) */}
      <div className="main-content">
        <Outlet /> 
      </div>

      {/* 2. THE BOTTOM ELEMENTS */}
      {/* Player is already set to fixed bottom: 60px in its own file */}
      <Player />
      
      {/* BottomNav will sit at the very bottom */}
      <BottomNav />
      
    </div>
  );
};

export default Layout;