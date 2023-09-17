// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdMeeamCMXT3S3nbWkA67b3v6ONjG2XcM",
  authDomain: "keen-virtue-398003.firebaseapp.com",
  projectId: "keen-virtue-398003",
  storageBucket: "keen-virtue-398003.appspot.com",
  messagingSenderId: "99450125783",
  appId: "1:99450125783:web:0107974c2b9586f51bdf92",
  measurementId: "G-WN747QH4C9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);