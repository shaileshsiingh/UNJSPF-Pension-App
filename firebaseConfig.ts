// Firebase configuration and initialization
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import type {} from 'firebase/app';
import type {} from 'firebase/auth';

// TODO: Replace with your own Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyCeM1AqHDklUSSV3IQASFTQxgfwqnR7pJg",
    authDomain: "unspension.firebaseapp.com",
    projectId: "unspension",
    storageBucket: "unspension.firebasestorage.app",
    messagingSenderId: "343269736783",
    appId: "1:343269736783:web:6ed1d1774317969917853a",
    measurementId: "G-7S8LLYJSD7"
  };

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

export { app, auth }; 