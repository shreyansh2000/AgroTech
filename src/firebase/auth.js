import { auth,database } from "./firebase";
import { ref, set } from 'firebase/database'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
export const doCreateUserWithEmailAndPassword = async (email, password) => {
  // Create user with email and password
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  
  // Now that the user account is created, send email verification
  await sendEmailVerification(userCredential.user, {
    // You can customize the URL to redirect to after verification if needed
    url: `${window.location.origin}/verify-email`, // Adjust the URL as needed
  });
  

  
  
  return userCredential;
};


export const doSignInWithEmailAndPassword = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  if (!userCredential.user.emailVerified) {
    throw new Error("Please verify your email address.");
    // Or you can resend the verification email here if you want
  }
  return userCredential;
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  // add user to firestore
};

export const doSignOut = () => {
  return auth.signOut();
};

export const doPasswordReset = (email) => {
  return sendPasswordResetEmail(auth, email);
};


export const doPasswordChange = (password) => {
  return updatePassword(auth.currentUser, password);
};


