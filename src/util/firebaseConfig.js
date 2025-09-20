// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCInJ-mVlnCVprHJ5h1ibF59V0qX0E0e9s",
  authDomain: "react-cb5dc.firebaseapp.com",
  databaseURL: "https://react-cb5dc-default-rtdb.firebaseio.com",
  projectId: "react-cb5dc",
  storageBucket: "react-cb5dc.firebasestorage.app",
  messagingSenderId: "861247150100",
  appId: "1:861247150100:web:2379c57e789a3a88f46f01",
  measurementId: "G-BV1YE1PM70"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Authentication instance
export const auth = getAuth(app);