import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// بياناتك من Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDAWFg9VcA0k11FtFB0DhpMC_MNCGf50No",
  authDomain: "az-ai-bot.firebaseapp.com",
  projectId: "az-ai-bot",
  storageBucket: "az-ai-bot.firebasestorage.app",
  messagingSenderId: "401046040353",
  appId: "1:401046040353:web:ac0dfc4f44313600131860"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);