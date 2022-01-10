// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCUG_xLr_FRRZs4ncsiTi93W9yhY9b-v78",
  authDomain: "reactnodetest-c5c2f.firebaseapp.com",
  projectId: "reactnodetest-c5c2f",
  storageBucket: "reactnodetest-c5c2f.appspot.com",
  messagingSenderId: "541211590045",
  appId: "1:541211590045:web:41350c51917ba25b110374",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
