import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBFOwcmswX9Kyv07Gkuxy--JhGfq651BoU",
  authDomain: "mscarpinteria-7b1a4.firebaseapp.com",
  projectId: "mscarpinteria-7b1a4",
  storageBucket: "mscarpinteria-7b1a4.appspot.com",
  messagingSenderId: "36661384885",
  appId: "1:36661384885:web:1411e8d0fd848b1b5890fc",
  measurementId: "G-0SHC5RRC3H",
};

initializeApp(firebaseConfig);

export const db = getFirestore();
export const auth = getAuth();
