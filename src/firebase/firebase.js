import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDGH1EXCdr41OZolHiPiyftzPm8bvKmL6Y",
    authDomain: "tomato-disease-identific-ba6d4.firebaseapp.com",
    databaseURL: "https://tomato-disease-identific-ba6d4-default-rtdb.firebaseio.com",
    projectId: "tomato-disease-identific-ba6d4",
    storageBucket: "tomato-disease-identific-ba6d4.appspot.com",
    messagingSenderId: "374304704954",
    appId: "1:374304704954:web:63464cfd88377e3d663583",
    measurementId: "G-EMBHG6QXGT"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)



export { app, auth };
