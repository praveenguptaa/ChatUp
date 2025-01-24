import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyCMyHDhNM088oiLdR3EvaatV7CsBzGwXdk",
    authDomain: "chat-app-6e317.firebaseapp.com",
    projectId: "chat-app-6e317",
    storageBucket: "chat-app-6e317.firebasestorage.app",
    messagingSenderId: "1032874898199",
    appId: "1:1032874898199:web:330fefc376f1e7eb0cbd52",
    measurementId: "G-Q9FJFEGD3H"
  };

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);