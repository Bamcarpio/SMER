import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAbludlWGuFuXm9-Oq16aFOlnajHB65qvA",
  authDomain: "smer-d76d5.firebaseapp.com",
  databaseURL: "https://smer-d76d5-default-rtdb.firebaseio.com",
  projectId: "smer-d76d5",
  storageBucket: "smer-d76d5.firebasestorage.app",
  messagingSenderId: "320749369052",
  appId: "1:320749369052:web:b431272b4305af96d8e619",
  measurementId: "G-6JND0NKP18"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
