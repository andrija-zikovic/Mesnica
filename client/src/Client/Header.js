import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = ({ title }) => {
  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/">
          <h1 className="header__h1">{title}</h1>
          <p>SINCE 1923.</p>
        </Link>
      </div>
    </header>
  );
};

export default Header;
