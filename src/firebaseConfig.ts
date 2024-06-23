import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCbSy9lPM9-36n4edz5ZHbHiuhbP2EG178",
    authDomain: "movie-recommender-9584a.firebaseapp.com",
    projectId: "movie-recommender-9584a",
    storageBucket: "movie-recommender-9584a.appspot.com",
    messagingSenderId: "551207516120",
    appId: "1:551207516120:web:22d561c457708fdb7424ad",
    measurementId: "G-L7LFL2FBFZ"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };