
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const apiKey = process.env.REACT_APP_FIREBASE_DB_API_KEY;
const authDomain = process.env.REACT_APP_FIREBASE_DB_AUTH_DOMAIN;
const projectId = process.env.REACT_APP_FIREBASE_DB_PROJECT_ID;
const storageBucket = process.env.REACT_APP_FIREBASE_DB_STORAGE_BUCKET;
const messagingSenderId = process.env.REACT_APP_FIREBASE_DB_MESSAGING_SENDER_ID;
const appId = process.env.REACT_APP_FIREBASE_DB_APP_ID;
const measurementId = process.env.REACT_APP_FIREBASE_DB_MEASUERMENT_ID;

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig).firestore();

