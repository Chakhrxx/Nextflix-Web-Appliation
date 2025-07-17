"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, googleProvider } from "../../lib/firebase";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmailAuth = async () => {
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="flex items-center justify-center bg-cover bg-center bg-no-repeat min-h-screen px-4"
      style={{ backgroundImage: "url('/MainShowBG.png')" }}
    >
      <div className="w-full max-w-sm bg-[#141414]/80 drop-shadow-2xl p-6 rounded shadow-md text-white">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isSignup ? "Sign Up" : "Sign In"}
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full bg-[#333] border-none text-white rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-red-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full bg-[#333] border-none text-white rounded px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-red-600"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-[#e50914] hover:bg-[#f6121d] text-white font-semibold py-2 rounded mb-4"
          onClick={handleEmailAuth}
        >
          {isSignup ? "Create Account" : "Sign In"}
        </button>

        <button
          className="w-full border border-gray-500 hover:border-white text-white py-2 rounded mb-6"
          onClick={handleGoogleSignIn}
        >
          Continue with Google
        </button>

        <p className="text-center text-sm text-gray-400">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            className="text-white font-semibold hover:underline"
            onClick={() => setIsSignup((prev) => !prev)}
          >
            {isSignup ? "Sign In" : "Create One"}
          </button>
        </p>
      </div>
    </div>
  );
}
