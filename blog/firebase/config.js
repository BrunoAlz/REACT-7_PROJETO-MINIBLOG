import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDwc3EiVxE1BXWZzVofVQzkDNJ2xg9OhRo",
  authDomain: "miniblog-3d9ab.firebaseapp.com",
  projectId: "miniblog-3d9ab",
  storageBucket: "miniblog-3d9ab.appspot.com",
  messagingSenderId: "285592665337",
  appId: "1:285592665337:web:0f31fe9aa17a199bee3628",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
