// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBqesjse8fBroi9JiLKr9oh0NaVWj6JKK0",
  authDomain: "chreactnative-ebddf.firebaseapp.com",
  projectId: "chreactnative-ebddf",
  storageBucket: "chreactnative-ebddf.appspot.com",
  messagingSenderId: "715708244920",
  appId: "1:715708244920:web:5b72f87c2cb67ed607254d",
  measurementId: "G-DYVSYLV146"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);