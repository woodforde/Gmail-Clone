import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBQ9nh-HJOdQ-a5RXlFREKkQqiSCnhAAgk",
    authDomain: "clone-7f10c.firebaseapp.com",
    projectId: "clone-7f10c",
    storageBucket: "clone-7f10c.appspot.com",
    messagingSenderId: "1054185442020",
    appId: "1:1054185442020:web:5bb0388906926477d8faf1"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };