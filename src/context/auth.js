import React, { useState, createContext, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignOut } from "firebase/auth";
import { firebase } from '../config/firebaseConnection';


export const AuthContext = createContext({});

function AuthProvider ({ children }) {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const auth = getAuth(firebase);

 
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; 
  }, []);


function test() {
  console.log("tentei lulalala");
}


async function signIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    setUser(userCredential.user); 
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
  } catch (e) {
    console.error(e);
  }
}

  return (
    <AuthContext.Provider value={{signed: !!user, user, signIn, signUp, signOut, test }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;