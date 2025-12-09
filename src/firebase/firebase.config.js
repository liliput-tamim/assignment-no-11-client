import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDP2Ci-g5pxciTEl85p0yuCh67Df-47bYA",
  authDomain: "assingment-no-11-35b9c.firebaseapp.com",
  projectId: "assingment-no-11-35b9c",
  storageBucket: "assingment-no-11-35b9c.firebasestorage.app",
  messagingSenderId: "462804293294",
  appId: "1:462804293294:web:f8fc474f13f76364ac3f3f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
