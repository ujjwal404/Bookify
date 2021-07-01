import React, { useContext, useEffect, useState } from 'react';
import app from './config';
import 'firebase/firestore';

const DBContext = React.createContext();

export function useFirestore() {
  return useContext(DBContext);
}

export function FirestoreProvider({ children }) {
  const db = app.firestore();

  const value = {
    db
  };
  return <DBContext.Provider value={value}>{children}</DBContext.Provider>;
}
// !loading && children
