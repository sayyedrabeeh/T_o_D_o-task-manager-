// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBVf6de4i1JRVkm4uhmPSKedqFgYBMJ8ew",
    authDomain: "todo-task-manager-7630b.firebaseapp.com",
    projectId: "todo-task-manager-7630b",
    storageBucket: "todo-task-manager-7630b.firebasestorage.app",
    messagingSenderId: "926444867868",
    appId: "1:926444867868:web:8eea2388fea2ba2e60aad9",
    measurementId: "G-TPQGRF44PC"
    
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);



