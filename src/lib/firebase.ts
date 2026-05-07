import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCW0NXLfnWh39Trgweml_zjuAn93cLCErI",
  authDomain: "twt-79e15.firebaseapp.com",
  projectId: "twt-79e15",
  storageBucket: "twt-79e15.firebasestorage.app",
  messagingSenderId: "871563895878",
  appId: "1:871563895878:web:37ac34eb4b6cfd75e15647",
  measurementId: "G-R3YFW7MS9G"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);