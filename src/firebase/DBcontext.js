import React, { useContext, useEffect, useState } from 'react';
import app from './config';
import 'firebase/firestore';

const DBContext = React.createContext();

export function useFirestore() {
  return useContext(DBContext);
}

export function FirestoreProvider({ children }) {
  const db = app.firestore();

  function getBooks() {
    return app.firestore().collection('Books').get();
  }

  const value = {
    getBooks,
    db
  };
  return <DBContext.Provider value={value}>{children}</DBContext.Provider>;
}
// !loading && children
