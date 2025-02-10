"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import AuthForm from "@/components/AuthForm";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      await register({ email, password });
      toast.success("Registered successfully! Please log in.");
      router.push("/login");
    } catch (error) {
      toast.error("Registration failed. Please try again.", error.message);
    } finally {
      setIsLoading(false)
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
      confirmPassword={confirmPassword}
      setConfirmPassword={setConfirmPassword}
      buttonText="Register"
      buttonIcon={isLoading ? <Loader className="w-4 h-4 mr-2 animate-spin" /> : null}
      buttonDisabled={isLoading}
      linkText="Already have an account? Login"
      linkHref="/login"
    />
  );
}
