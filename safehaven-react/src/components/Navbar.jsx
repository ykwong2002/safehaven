import React from 'react';
import logo from '../assets/logo.png';

const Navbar = () => {
  return (
    <div className="NavBar">
      <header className="logo">
        <a href="/">
          <img src={logo} alt="SafeHaven Logo" className="logo" />
        </a>
      </header>
      <h1 className="Title">
        SafeHaven: Your Space to<br />Heal and Thrive
      </h1>
    </div>
  );
};

export default Navbar; 