import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDRRrDCeEU8HCdGJ3_robYcuyNjBml4NzM",
  authDomain: "blog-69c32.firebaseapp.com",
  projectId: "blog-69c32",
  storageBucket: "blog-69c32.appspot.com",
  messagingSenderId: "343354948570",
  appId: "1:343354948570:web:9ee11ed4f4c2491ade5ee3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
