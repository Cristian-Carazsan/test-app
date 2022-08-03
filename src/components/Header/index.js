import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

function Header() {
  let location = useLocation();
  return (
    <nav>
      <Link className={location.pathname === "/" ? "active" : null} to="/">
        Home
      </Link>
      <Link
        className={location.pathname === "/images" ? "active" : null}
        to="/images"
      >
        Images
      </Link>
      <Link
        className={location.pathname === "/sheets" ? "active" : null}
        to="/sheets"
      >
        Sheets
      </Link>
    </nav>
  );
}

export default Header;
