import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar sticky-top">
      <div className="brandBG">
        <span className="brand">NotifyU-Admins | Library</span>
      </div>

      <div className="linksBG">

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "link linkActive" : "link"
          }
        >
          Books
        </NavLink>

        <NavLink
          to="/issued-books"
          className={({ isActive }) =>
            isActive ? "link linkActive" : "link"
          }
        >
          Issued Books
        </NavLink>

        <NavLink
          to="/account"
          className={({ isActive }) =>
            isActive ? "link linkActive" : "link"
          }
        >
          Account
        </NavLink>

      </div>
    </nav>
  );
}