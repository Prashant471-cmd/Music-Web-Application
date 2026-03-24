import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="app-layout">
      <div className="page-content">
        <Outlet /> 
      </div>
      <Footer />
    </div>
  );
};

export default Layout;