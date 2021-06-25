import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../../firebase/AuthContext';
import './auth.scss';
import image from './auth.svg';
import icon from './favicon.png';

function Auth() {
  const [show, setShow] = useState('login');
  const { googleLogin } = useAuth();
  const history = useHistory();

  async function onGoogleClick(e) {
    e.preventDefault();
    try {
      await googleLogin();
      history.push('/dashboard');
    } catch {
      console.log('failed to login with google');
    }
  }
  return (
    <>
      <div className="auth-container">
        <div className="auth-left">
          <h1 className="website-head">Bookify</h1>
          <div className="img-holder">
            <img src={image} alt="auth-svg" />
          </div>
        </div>
        <div className="auth-right">
          <img
            src="https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg"
            className="firebase-logo"
          />
          <div className="form-content">
            <div className="form-heading">
              <h1>Welcome to Bookify</h1>
              <h1>Your online bookstore.</h1>
            </div>
            <div className="line">
              <p>Buy and sell books with one click.</p>
            </div>

            <div className="auth-btn-row">
              <div className="login-auth auth-tab" onClick={() => setShow('login')}>
                Login
              </div>
              <div className="register-auth auth-tab" onClick={() => setShow('register')}>
                Register
              </div>
            </div>

            <div className="form-inputs">
              {show === 'login' ? (
                <>
                  <input type="text" placeholder="email address" />
                  <input type="password" placeholder="Password" />
                </>
              ) : (
                <>
                  <input type="text" placeholder="email address" />
                  <input type="password" placeholder="Password" />
                  <input type="password" placeholder="confirm Password" />
                </>
              )}
            </div>
            <div className="submit-btn">
              <button>{show}</button>
            </div>
            <div className="extra-options">
              or {show} with
              <div onClick={(e) => onGoogleClick(e)} className="google">
                <img src="https://www.vectorlogo.zone/logos/google/google-icon.svg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Auth;
