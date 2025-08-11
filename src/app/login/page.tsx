"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import SignInButtons from "../components/SignInButtons";

export default function LoginPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="mb-6 text-2xl font-bold">Login</h1>
      <SignInButtons />
    </div>
  );
}
