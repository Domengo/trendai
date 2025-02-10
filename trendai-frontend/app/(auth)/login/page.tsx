"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import AuthForm from "@/components/AuthForm";
import toast from "react-hot-toast";
import {Loader} from "lucide-react"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const validateForm = (email: string, password: string) => {
    if (!email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
      throw new Error("Invalid email format");
    }
    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      validateForm(email, password)
      await login({ email, password });
      toast.success("Logged in successfully!");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Login failed. Please check your credentials.", error.message);
    } finally {
      setIsLoading(false)
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
      buttonText={isLoading ? "Logging in..." : "Login"}
      buttonIcon={isLoading ? <Loader className="w-4 h-4 mr-2 animate-spin" /> : undefined}
      buttonDisabled={isLoading}
      linkText="Don't have an account? Register"
      linkHref="/register"
    />
  );
}