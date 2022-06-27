import React from "react";

export default function Header(props) {
  return (
    <nav className={props.darkMode ? "dark" : ""}>
      <div className="nav-logo">
        <img
          className="nav--image"
          src="https://i.ibb.co/1JMn4r5/logo-NC.png"
          alt="Reputation Wallet"
        />
        <h1>Natluk</h1>
      </div>
      <div className="toggler">
        <p className="toggler--light">Light</p>
        <div className="toggler--slider" onClick={props.toggleDarkMode}>
          <div className="toggler--slider--circle"></div>
        </div>
        <p className="toggler--dark">Dark</p>
      </div>
    </nav>
  );
}
