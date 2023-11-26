// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: 'AIzaSyCx4ukuHk40m0ISwC_1C-39N1c2X4BaOZk',
  authDomain: 'newsfeed-bc445.firebaseapp.com',
  projectId: 'newsfeed-bc445',
  storageBucket: 'newsfeed-bc445.appspot.com',
  messagingSenderId: '927261142906',
  appId: '1:927261142906:web:b5e7cda17806df8c5ef0c3'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
