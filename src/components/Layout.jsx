import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Player from "./Player";
import BottomNav from "./BottomNav";

const Layout = () => {
  // 1. Get the current URL path
  const location = useLocation();

  // 2. Check if the user is on the full-screen Song page
  const isSongPage = location.pathname.startsWith("/song");

  return (
    <div 
      className="layout-wrapper" 
      style={{ 
        // Dynamically remove the bottom padding if we are on the Song page!
        paddingBottom: isSongPage ? "0px" : "140px", 
        minHeight: "100vh" 
      }}
    >
      
      {/* 1. THE MAIN PAGE CONTENT (Dashboard, Search, etc.) */}
      <div className="main-content">
        <Outlet /> 
      </div>

      {/* 2. THE BOTTOM ELEMENTS */}
      {/* Only show the Player and BottomNav if we are NOT on the Song page */}
      {!isSongPage && (
        <>
          <Player />
          <BottomNav />
        </>
      )}
      
    </div>
  );
};

export default Layout;