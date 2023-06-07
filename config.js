import { initializeApp } from "firebase/app";
import { getStorage, ref } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBZUxg6F3-0FuJj95cnqVxDZENbhnVL0lM",
    authDomain: "t-13859.firebaseapp.com",
    projectId: "t-13859",
    storageBucket: "t-13859.appspot.com",
    messagingSenderId: "858890046440",
    appId: "1:858890046440:web:e098a281aa66ab5cdaf25d",
    measurementId: "G-5SZ03QPETW"
  };
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);