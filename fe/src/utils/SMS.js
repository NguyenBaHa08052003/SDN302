import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBg86n3vvE4nCT7e1UvL9ircX4pbdSgQyY",
  authDomain: "sdn302-df7eb.firebaseapp.com",
  projectId: "sdn302-df7eb",
  storageBucket: "sdn302-df7eb.firebasestorage.app",
  messagingSenderId: "307109672963",
  appId: "1:307109672963:web:bb7c168eff0cfb1f27b636",
  measurementId: "G-TLG99YLYK5"
};
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export default firebaseApp;