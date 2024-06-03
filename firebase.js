import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBNdZrKg7Ex9S4HT87O89_S1Ku0PQvvsiA",
  authDomain: "panel-studenta-63093.firebaseapp.com",
  projectId: "panel-studenta-63093",
  storageBucket: "panel-studenta-63093.appspot.com",
  messagingSenderId: "867503878289",
  appId: "1:867503878289:web:71ae469083f9671ff68f30"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const getProfilePictureURL = async (albumNumber) => {
  const profilePicRef = ref(storage, `${albumNumber}.png`);
  try {
    const url = await getDownloadURL(profilePicRef);
    return url;
  } catch (error) {
    console.error("Error fetching profile picture URL:", error);
    return null;
  }
};

export { db, getProfilePictureURL };
