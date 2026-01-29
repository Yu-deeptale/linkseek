import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOKwlma-eYWvM0NyYEUNCLfUB8dgZhot4",
  authDomain: "linkseek-dev.firebaseapp.com",
  projectId: "linkseek-dev",
  storageBucket: "linkseek-dev.firebasestorage.app",
  messagingSenderId: "856553293451",
  appId: "1:856553293451:web:73b5f8f6099de4c756b68e",
  measurementId: "G-Q7VPJ58BVE"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
