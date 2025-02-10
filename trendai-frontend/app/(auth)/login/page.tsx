"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import AuthForm from "@/components/AuthForm";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      toast.success("Logged in successfully!");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <AuthForm
      title="Login to your account"
      onSubmit={handleSubmit}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      buttonText="Login"
      linkText="Don't have an account? Register"
      linkHref="/register"
    />
  );
}