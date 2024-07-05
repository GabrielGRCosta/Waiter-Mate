import React, { useState, createContext, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignOut } from "firebase/auth";
import { firebase } from '../config/firebaseConnection';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const auth = getAuth(firebase);

  async function onAuthStateChanged(user) {
    setUser(user);
    if (user) {
      await AsyncStorage.setItem('user', JSON.stringify(user));
    }
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const initialize = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) setUser(JSON.parse(storedUser));
      setInitializing(false);
    };
    initialize();
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  async function signIn(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      await AsyncStorage.setItem('user', JSON.stringify(userCredential.user));
    } catch (e) {
      console.error(e);
    }
  }

  async function signUp(email, password) {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
      console.error(e);
    }
  }

  async function signOut() {
    try {
      await firebaseSignOut(auth);
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;