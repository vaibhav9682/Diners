import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCc70Swb54e5ZWcUmJn8J2VoBPlo33QAWs",
  authDomain: "restaurent-bdb7f.firebaseapp.com",
  projectId: "restaurent-bdb7f",
  storageBucket: "restaurent-bdb7f.appspot.com",
  messagingSenderId: "327994454201",
  appId: "1:327994454201:web:7cfc24be13bce712372b68"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;