import React from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../../firebase/AuthContext';
import './navbar.scss';
import Cart from '../Cart/cart';

function Navbar() {
  const { currentUser } = useAuth();
  const { logout } = useAuth();
  const history = useHistory();
  console.log(currentUser);

  async function SignOutClick() {
    try {
      await logout();
      history.push('/auth');
    } catch {
      console.log('failed to logout');
    }
  }

  function trigger() {
    return (
      <div className="checkout-cart">
        <img src="https://img.icons8.com/material-two-tone/64/000000/fast-cart.png" />
      </div>
    );
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
          <img src={currentUser.photoURL} alt="" className="user-img" />
        </div>
        <Cart trigger={trigger} />
        <div className="profile-menu">
          <div onClick={() => SignOutClick()} className="logout-btn">
            LogOut
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
