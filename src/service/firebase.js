// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { initializeAuth, getReactNativePersistence } from '@firebase/auth';
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: 'AIzaSyBZIZ_Bmam3NY06OGIFcqHPfQAl9kZsPK0',
  authDomain: 'o-rezervasyon.firebaseapp.com',
  projectId: 'o-rezervasyon',
  storageBucket: 'o-rezervasyon.appspot.com',
  messagingSenderId: '802309044560',
  appId: '1:802309044560:web:6fa6c80fb3ee0f32db5455',
  measurementId: 'G-3BE00XL74D',
};

const app = initializeApp(firebaseConfig);

const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const storage = getStorage(app);

export { db, storage, auth };