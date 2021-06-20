import React from 'react';
import './navbar.scss';

function Navbar() {
  return (
    <nav className="header">
      <div className="browse">
        <div className="browse-category">
          Browse Category
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="feather feather-chevron-down"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search Book" />
        </div>
      </div>
      <div className="header-title">Bookify</div>
      <div className="profile">
        <div className="user-profile">
          <img src="https://randomuser.me/api/portraits/women/63.jpg" alt="" className="user-img" />
        </div>
        <div className="profile-menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="feather feather-menu"
          >
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
          Menu
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
