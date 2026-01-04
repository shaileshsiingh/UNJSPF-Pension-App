// Firebase configuration and initialization
import { FirebaseError, getApp, getApps, initializeApp } from 'firebase/app';
import {
  Auth,
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from 'firebase/auth';
import { Platform } from 'react-native';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

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

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

let auth: Auth;

if (Platform.OS === 'web') {
  auth = getAuth(app);
} else {
  try {
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    });
  } catch (error) {
    const firebaseError = error as FirebaseError;
    if (firebaseError.code === 'auth/already-initialized') {
      auth = getAuth(app);
    } else {
      throw error;
    }
  }
}

export { app, auth }; 