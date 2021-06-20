import React, { useContext, useEffect, useState } from 'react';
import app from './config';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return app.auth().createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return app.auth().signInWithEmailAndPassword(email, password);
  }

  function googleLogin() {
    var provider = new app.auth.GoogleAuthProvider();
    return app
      .auth()
      .signInWithPopup(provider)
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  function logout() {
    return app.auth().signOut();
  }

  useEffect(() => {
    // const unsubscribe = app.auth().onAuthStateChanged((user) => {
    //   setCurrentUser(user);
    //   setLoading(false);
    // });
    // return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    googleLogin,
    logout
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
// !loading && children
