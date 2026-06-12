import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBX2mwt745vMgJzF7bpO9_e9AV6zQfhI5w",
  authDomain: "controle-estoque-v2.firebaseapp.com",
  projectId: "controle-estoque-v2",
  storageBucket: "controle-estoque-v2.firebasestorage.app",
  messagingSenderId: "882112759422",
  appId: "1:882112759422:web:939d80c7f5e39c6a21ba2f",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
