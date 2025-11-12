import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAVciMywqfMdH0rQm66fUzpC2fo9Xpyj4s",
    authDomain: "next-js-demo-4b4f2.firebaseapp.com",
    projectId: "next-js-demo-4b4f2",
    storageBucket: "next-js-demo-4b4f2.firebasestorage.app",
    messagingSenderId: "955115923097",
    appId: "1:955115923097:web:c143b493bf4d374edffa08"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);