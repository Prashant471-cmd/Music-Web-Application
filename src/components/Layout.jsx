import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div style={{ backgroundColor: "#050505", minHeight: "100vh" }}>
      <div style={{ paddingBottom: "70px" }}>
        <Outlet /> 
      </div>
      <Footer />
    </div>
  );
};

export default Layout;