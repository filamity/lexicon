import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

var firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAsyQYqKeH2BwmTjMgcrQvXwGfwgYO9cFw",
  authDomain: "lexiconjp.firebaseapp.com",
  projectId: "lexiconjp",
  storageBucket: "lexiconjp.appspot.com",
  messagingSenderId: "616386942326",
  appId: "1:616386942326:web:a11745516c6db100765657",
  measurementId: "G-CDBBP863P3",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

export { firebase, firebaseApp, auth, firestore };
