import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCXttvv_ZKur9-4qjequVYmDRIok7JlK8w",
  authDomain: "tenedoresv2-483f5.firebaseapp.com",
  projectId: "tenedoresv2-483f5",
  storageBucket: "tenedoresv2-483f5.appspot.com",
  messagingSenderId: "148749276971",
  appId: "1:148749276971:web:acbba251d94025c572176e"
};

export const initFirebase = initializeApp(firebaseConfig);
export const db = getFirestore(initFirebase);