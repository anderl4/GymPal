import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDXtATQlpTER-NBw5ZKKhTuGwnzupXscfw",
  authDomain: "gympal-48208.firebaseapp.com",
  projectId: "gympal-48208",
  storageBucket: "gympal-48208.appspot.com",
  messagingSenderId: "702701744274",
  appId: "1:702701744274:web:5a7ca7456a6159f510364b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };