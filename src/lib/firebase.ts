import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAvYSdEXwVeuUHZaJxDydKnr3BM96LiYlk",
  authDomain: "couchsurfing-clone.firebaseapp.com",
  projectId: "couchsurfing-clone",
  storageBucket: "couchsurfing-clone.firebasestorage.app",
  messagingSenderId: "529881179312",
  appId: "1:529881179312:web:288955da278ddbd4110775",
  measurementId: "G-K5KD7HP7K8"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);