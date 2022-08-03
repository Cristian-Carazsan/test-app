import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header(props) {
  return (
    <nav>
      <Link to="/"> Home </Link>
      <Link to="/images"> Images </Link>
      <Link to="/sheets"> Sheets </Link>
    </nav>
  );
}

export default Header;
