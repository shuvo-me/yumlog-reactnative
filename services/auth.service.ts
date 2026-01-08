import { SignUpSchemaType } from "@/app/sign-up";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from "firebase/auth";
import { auth } from "../lib/firebase";

// Register a new user
export const registerUser = async ({email, password}: SignUpSchemaType) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Optionally add the user's name to their profile
    await updateProfile(userCredential.user,{displayName: 'User'});
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Login existing user
export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Logout
export const logoutUser = () => signOut(auth);