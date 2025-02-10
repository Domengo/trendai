"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import api from "@/lib/api";

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const checkToken = useCallback(() => {
    try {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        setIsLoading(false);
        return;
      }
      const decodedToken: any = jwtDecode(storedToken);
      const currentTime = Date.now() / 1000;

      console.log("Decoded Token:", decodedToken);
      console.log("Current Time:", currentTime);

      if (decodedToken.exp < currentTime) {
        logout();
        toast.error("Your session has expired. Please log in again.");
        return false;
      } else {
        setToken(storedToken);
        setIsLoading(false);
        return true;
      }
    } catch (error) {
      console.error("Error checking token:", error);
      logout();
      toast.error("There was an issue with your session. Please log in again.");
      setIsLoading(false);
      return false;
    }
  }, []);

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const response = await api.post("/auth/login", credentials);
      const { access_token } = response.data;
      localStorage.setItem("token", access_token);
      setToken(access_token);
      toast.success("Logged in successfully!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Failed to log in. Please try again.");
    }
  };

  const register = async (credentials: { email: string; password: string }) => {
    try {
      await api.post("/auth/register", credentials);
      toast.success("Registered successfully! Please log in.");
      router.push("/login");
    } catch (error) {
      console.error("Error registering:", error);
      toast.error("Failed to register. Please try again.");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    router.push("/login");
    toast.success("Logged out successfully!");
  };

  return { token, login, register, logout, isLoading, checkToken };
};