import React from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../../firebase/AuthContext';
import './navbar.scss';

function Navbar() {
  const { logout } = useAuth();
  const history = useHistory();

  async function SignOutClick() {
    try {
      await logout();
      history.push('/auth');
    } catch {
      console.log('failed to logout');
    }
  }

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
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
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
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-menu"
          >
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
          <div onClick={() => SignOutClick()} style={{ cursor: 'pointer' }}>
            LogOut
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
