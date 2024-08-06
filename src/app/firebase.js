// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDTy3XTdE2Gim_btRZME73eEHUrGGq1f_U",
    authDomain: "annotate-x.firebaseapp.com",
    projectId: "annotate-x",
    storageBucket: "annotate-x.appspot.com",
    messagingSenderId: "15729345594",
    appId: "1:15729345594:web:acdf83248a5eecde9fe103",
    measurementId: "G-S9Y7010KT4",
    databaseUrl: "https://annotate-x-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const GitHubProvider = new GithubAuthProvider();
