import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCOBFMnoPcvW_OSIHy5j0OulI2UCz10Gt0",
  authDomain: "tomatocrop-66f6d.firebaseapp.com",
  databaseURL: "https://tomatocrop-66f6d-default-rtdb.firebaseio.com",
  projectId: "tomatocrop-66f6d",
  storageBucket: "tomatocrop-66f6d.appspot.com",
  messagingSenderId: "774873843581",
  appId: "1:774873843581:web:bdd38f5ba283380e1c2e14"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)



export { app, auth };
