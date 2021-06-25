import React, { useContext, useEffect, useState } from 'react';
import app from './config';
import firebase from 'firebase';
import { store } from 'react-notifications-component';

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
      })
      .catch((error) => {
        store.addNotification({
          title: 'Login Failed',
          message: error.message,
          type: 'danger',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animate__animated', 'animate__fadeIn'],
          animationOut: ['animate__animated', 'animate__fadeOut'],
          dismiss: {
            duration: 0,
            showIcon: true
          }
        });
      });
  }

  async function githubLogin() {
    var provider = new firebase.auth.GithubAuthProvider();
    await firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        var user = result.user;
        console.log(user, 'github user');
        setCurrentUser(user);
      })
      .catch((error) => {
        store.addNotification({
          title: 'Login Failed',
          message: error.message,
          type: 'danger',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animate__animated', 'animate__fadeIn'],
          animationOut: ['animate__animated', 'animate__fadeOut'],
          dismiss: {
            duration: 0,
            showIcon: true
          }
        });
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
    githubLogin,
    signup,
    login,
    googleLogin,
    logout
  };
  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
// !loading && children
