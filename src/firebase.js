// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBCXQklWxyM_d4PwUKZehFtUyYK40VXGhE',
  authDomain: 'newsfeed-1bb38.firebaseapp.com',
  projectId: 'newsfeed-1bb38',
  storageBucket: 'newsfeed-1bb38.appspot.com',
  messagingSenderId: '663151359628',
  appId: '1:663151359628:web:258582b3a70f6725ddeda9'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// React에서 정상적으로 동작하는 지 확인하기 위해서 임시로 export 시켜줍니다. app이 정상적으로 출력되는 것을 확인하고 나면, 지워줍니다.
export const db = getFirestore(app);
