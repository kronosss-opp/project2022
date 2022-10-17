import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBdLSii08SACa0jOlsd1cpPl9NUCCb5S84",
  authDomain: "chatapp2-ee74d.firebaseapp.com",
  projectId: "chatapp2-ee74d",
  storageBucket: "chatapp2-ee74d.appspot.com",
  messagingSenderId: "820619477858",
  appId: "1:820619477858:web:16a3d4027a9568f5d7223b",
  measurementId: "G-V901471THR",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const store = getStorage();
export const db = getFirestore();
