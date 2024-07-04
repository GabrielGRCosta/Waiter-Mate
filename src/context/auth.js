import React, { useState, createContext, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignOut } from "firebase/auth";
import { firebase } from '../config/firebaseConnection'; // Ajuste o caminho de importação conforme necessário

// Criando um contexto de autenticação
export const AuthContext = createContext({});

function AuthProvider ({ children }) {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const auth = getAuth(firebase); // Obtém a instância de autenticação

  // Função para tratar mudanças de estado do usuário
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // Desinscrever na desmontagem
  }, []);

 // Funções de autenticação modificadas para funções assíncronas
function test() {
  console.log("tentei lulalala");
}


async function signIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    setUser(userCredential.user); // Atualiza o estado do usuário com o usuário autenticado
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