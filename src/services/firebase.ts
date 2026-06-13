import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDxw_o-wIbRRRMHYqdHkAvANxATf7Y1Zgo",
  authDomain: "attendx-v3.firebaseapp.com",
  projectId: "attendx-v3",
  storageBucket: "attendx-v3.firebasestorage.app",
  messagingSenderId: "502205118858",
  appId: "1:502205118858:web:d47064c72deec5a8f9b073",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export default app;