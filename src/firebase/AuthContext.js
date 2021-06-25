import React, { useContext, useEffect, useState } from 'react';
import app from './config';
import firebase from 'firebase';

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

  async function googleLogin() {
    var provider = new firebase.auth.GoogleAuthProvider();
    await firebase
      .auth()
      .signInWithPopup(provider)
      .then((user) => {
        setCurrentUser(user);
        console.log(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  function logout() {
    return app.auth().signOut();
  }

  useEffect(() => {
    const unsubscribe = app.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    googleLogin,
    logout
  };
  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
// !loading && children
