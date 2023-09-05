// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWHHpLa1XM5WVAxfS2hcCrr_A_gJ0wwkc",
  authDomain: "knowledgenet-952db.firebaseapp.com",
  projectId: "knowledgenet-952db",
  storageBucket: "knowledgenet-952db.appspot.com",
  messagingSenderId: "1092821961872",
  appId: "1:1092821961872:web:fcd34bea7f2ba0cffbdc15"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);

