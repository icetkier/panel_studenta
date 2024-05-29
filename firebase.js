import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBNdZrKg7Ex9S4HT87O89_S1Ku0PQvvsiA",
    authDomain: "panel-studenta-63093.firebaseapp.com",
    projectId: "panel-studenta-63093",
    storageBucket: "panel-studenta-63093.appspot.com",
    messagingSenderId: "867503878289",
    appId: "1:867503878289:web:71ae469083f9671ff68f30"
  };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const database = firebase.database();
export default firebase;