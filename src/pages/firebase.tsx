
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAfME1q9QAVkcb7E8KJ4qMiKjDtN7HDwjw",
    authDomain: "loginform-domo.firebaseapp.com",
    projectId: "loginform-domo",
    storageBucket: "loginform-domo.appspot.com",
    messagingSenderId: "555716568828",
    appId: "1:555716568828:web:fae15f857d28ecf3ad1979",
    measurementId: "G-BBE14VL2N0"
  };
  


  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);
  const db = getFirestore(app);
  
  export { auth, db };