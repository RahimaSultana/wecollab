// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//To implement the authentication 
import {getAuth} from 'firebase/auth';
//to use the database 
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcBBFqxVmn0lkEvsoDjWKKIeUXOfLYYvU",
  authDomain: "wecollab-a7b6c.firebaseapp.com",
  projectId: "wecollab-a7b6c",
  storageBucket: "wecollab-a7b6c.appspot.com",
  messagingSenderId: "47702592196",
  appId: "1:47702592196:web:d684d6dd3cf29212579791"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const db=getFirestore(app);