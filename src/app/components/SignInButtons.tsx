"use client";

import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { auth } from "../lib/firebaseConfig";

export default function SignInButtons() {
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  const signInWithGitHub = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
    } catch (error) {
      console.error("GitHub sign-in error:", error);
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={signInWithGoogle}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Sign in with Google
      </button>

      <button
        onClick={signInWithGitHub}
        className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
      >
        Sign in with GitHub
      </button>
    </div>
  );
}
