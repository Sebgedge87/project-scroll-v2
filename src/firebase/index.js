// src/firebase/config.js
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDyMxL258a0U53G1u6ZmDO83ubMAbKcPTk",
  authDomain: "project-scroll-v2.firebaseapp.com",
  projectId: "project-scroll-v2",
  storageBucket: "project-scroll-v2.firebasestorage.app",
  messagingSenderId: "590899353311",
  appId: "1:590899353311:web:7ee24317120d0a538abb6a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 
export const auth = getAuth(app)
export const db = getFirestore(app)
console.log("Auth:", auth, "DB:", db);