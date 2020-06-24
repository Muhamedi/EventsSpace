﻿import React from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.css";

//TODO Web Template Studio: Add a new link in the NavBar for your page here.
// A skip link is included as an accessibility best practice. For more information visit https://www.w3.org/WAI/WCAG21/Techniques/general/G1.
const NavBar = () => {
  return (
    <>
      <div className={styles.skipLink}>
        <a href="#mainContent">Skip to Main Content</a>
      </div>
      <nav className="navbar navbar-expand-sm navbar-light border-bottom justify-content-between">
        <Link className="navbar-brand" to="/events">
          Events
        </Link>
        <Link className="navbar-brand" to="/history">
          History
        </Link>
        <Link className="navbar-brand" to="/ratings">
          Ratings
        </Link>
        <div className="navbar-nav">
          <Link className="nav-item nav-link active" to="/login">
            Log In
          </Link>
          <Link className="nav-item nav-link active" to="/signup">
            Sign Up
          </Link>
        </div>
      </nav>
    </>
  );
};
export default NavBar;