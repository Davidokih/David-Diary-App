import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAeSKyPV8JqPLBZanEuUoQM7v0GnQuBiJI",
    authDomain: "david-diary-99303.firebaseapp.com",
    projectId: "david-diary-99303",
    storageBucket: "david-diary-99303.appspot.com",
    messagingSenderId: "409577057292",
    appId: "1:409577057292:web:c7761f93c3aef5cc331229"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const storage = getStorage(app)
const auth = getAuth(app)

export { db, storage, auth }