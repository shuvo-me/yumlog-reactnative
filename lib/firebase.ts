import { getReactNativePersistence } from '@firebase/auth/react-native';
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from 'firebase/app';
import {
    initializeAuth
} from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// Optional: If you need auth later
// import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCmjTIARcTzxg_vv0Og68Xai3AsugttwAw",
  authDomain: "yumlog-709ba.firebaseapp.com",
  projectId: "yumlog-709ba",
  storageBucket: "yumlog-709ba.firebasestorage.app",
  messagingSenderId: "942003056044",
  appId: "1:942003056044:web:f35591316a579e40729e09",
  measurementId: "G-YDRTEMLVV1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
})
export const db = getFirestore(app);
export const storage = getStorage(app);