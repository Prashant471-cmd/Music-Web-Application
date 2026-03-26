import React from "react";
import { Outlet } from "react-router-dom";
import Player from "./Player";
import BottomNav from "./BottomNav";
import Footer from "./Footer"; // <-- Don't forget to import your Footer!

const Layout = () => {
  return (
    <div className="layout-wrapper" style={{ paddingBottom: "180px", position: "relative", minHeight: "100vh" }}>
      
      {/* 1. THE MAIN PAGE CONTENT (Dashboard, Search, etc.) */}
      <div className="main-content">
        <Outlet /> 
      </div>

      {/* 2. THE FIXED BOTTOM ELEMENTS (These stay on screen forever) */}
      <div className="fixed-bottom-elements" style={{ position: "fixed", bottom: 0, left: 0, width: "100%", zIndex: 1000 }}>
        
        {/* The music player sits just above the navigation */}
        <Player />
        
        {/* Depending on your design, you might only want one of these showing at a time, 
            but here is how you render both! */}
        <Footer />
        <BottomNav />
        
      </div>
      
    </div>
  );
};

export default Layout;