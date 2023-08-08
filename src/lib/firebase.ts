import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCY6wy-0PzALIeTgmDvMolSO7BmJI6_pOU",
    authDomain: "cdass-5d607.firebaseapp.com",
    projectId: "cdass-5d607",
    storageBucket: "cdass-5d607.appspot.com",
    messagingSenderId: "529171788666",
    appId: "1:529171788666:web:2e6458e7388c05542adcc3",
    measurementId: "G-TQWB0N2SX1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();