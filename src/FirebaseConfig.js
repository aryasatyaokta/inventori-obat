import { initializeApp } from "firebase/app";
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAFL5LTHeblXwTFdvqPMfA1c-aVBXMFwRM",
    authDomain: "vue-invent.firebaseapp.com",
    projectId: "vue-invent",
    storageBucket: "vue-invent.appspot.com",
    messagingSenderId: "568250850294",
    appId: "1:568250850294:web:422b2295a10a8e6c1105d7"
  };
  
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export {auth, db, analytics}