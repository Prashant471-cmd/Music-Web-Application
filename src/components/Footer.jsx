import React from "react";
import { NavLink } from "react-router-dom";

const BottomNav = () => {
    return(
        <>
         <nav className="bottom-nav">
            <NavLink to="/dashboard" className="nav-item">
                <i className="icon-home">Home</i>
            </NavLink>

            <NavLink to="/search" className="nav-item">
                <i className="icon-search">Search</i>
            </NavLink>

            <NavLink to="/library" className="nav-item">
                <i className="icon-library">Library</i>
            </NavLink>
         </nav>
        </>
    );
};

export default BottomNav;