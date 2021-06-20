import React, { useContext, useEffect, useState } from 'react';
import app from './config';
import 'firebase/firestore';

const DBContext = React.createContext();

export function useFirestore() {
  return useContext(DBContext);
}

export function FirestoreProvider({ children }) {
  function getBooks() {
    return app.firestore().collection('Books').get();
  }

  const value = {
    getBooks
  };
  return <DBContext.Provider value={value}>{children}</DBContext.Provider>;
}
// !loading && children
