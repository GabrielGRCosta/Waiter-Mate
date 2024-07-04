
import { initializeApp } from "firebase/app";

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
