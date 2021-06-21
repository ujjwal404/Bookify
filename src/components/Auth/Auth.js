import React from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../../firebase/AuthContext';

function Auth() {
  const { googleLogin } = useAuth();
  const history = useHistory();

  async function onGoogleClick(e) {
    e.preventDefault();
    try {
      history.push('/');
      await googleLogin();
      history.push('/');
    } catch {
      console.log('failed to login with google');
    }
  }
  return (
    <div>
      <button onClick={(e) => onGoogleClick(e)}>Sign In</button>
    </div>
  );
}

export default Auth;
