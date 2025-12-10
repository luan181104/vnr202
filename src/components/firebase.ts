// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALINmMxrnMLjem_O4Pn5Q91h9YFk75t74",
  authDomain: "quiz-vnr.firebaseapp.com",
  projectId: "quiz-vnr",
  storageBucket: "quiz-vnr.firebasestorage.app",
  messagingSenderId: "172975332750",
  appId: "1:172975332750:web:6640f1a1677674438c18df",
  measurementId: "G-3WZ5XM7HJH",
  databaseURL: "https://quiz-vnr-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app);
