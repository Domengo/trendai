"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import AuthForm from "@/components/AuthForm";
import toast from "react-hot-toast";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({ email, password });
      toast.success("Registered successfully! Please log in.");
      router.push("/login");
    } catch (error) {
      toast.error("Registration failed. Please try again.", error);
    }
  };

  return (
    <AuthForm
      title="Create an account"
      onSubmit={handleSubmit}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      buttonText="Register"
      linkText="Already have an account? Login"
      linkHref="/login"
    />
  );
}