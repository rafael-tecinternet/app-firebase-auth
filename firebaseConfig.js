// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkLv9YycHJT_f4JuXU8AvJjVxwtDwZok0",
  authDomain: "autenticacao-usuario-2a0c1.firebaseapp.com",
  projectId: "autenticacao-usuario-2a0c1",
  storageBucket: "autenticacao-usuario-2a0c1.appspot.com",
  messagingSenderId: "443050640860",
  appId: "1:443050640860:web:15205323e109d59d6d3b19",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
