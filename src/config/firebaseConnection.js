import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAhFCIydHsHbHSZipN0CW4wP9tMr2KGBJ4",
  authDomain: "waiter-mate.firebaseapp.com",
  projectId: "waiter-mate",
  storageBucket: "waiter-mate.appspot.com",
  messagingSenderId: "492086947461",
  appId: "1:492086947461:web:a06437b97dee420e8f43ec",
  measurementId: "G-DQ02XC5310"
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
export const firestore = getFirestore(firebase);

// Initialize Firebase Auth with React Native persistence
const auth = initializeAuth(firebase, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { auth };