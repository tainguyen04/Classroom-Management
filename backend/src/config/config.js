// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7_ptneEaNgRfutHneSyAYw62yzCvELNk",
  authDomain: "classroom-management-app-317c7.firebaseapp.com",
  projectId: "classroom-management-app-317c7",
  storageBucket: "classroom-management-app-317c7.firebasestorage.app",
  messagingSenderId: "464861101755",
  appId: "1:464861101755:web:a1c81a68151b46f3cbb39e",
  measurementId: "G-JP3ED7384T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);