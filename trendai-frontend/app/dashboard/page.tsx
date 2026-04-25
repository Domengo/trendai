"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Dashboard from "@/components/Dashboard";
import { useAuth } from "@/hooks/useAuth";
import { Loader } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const { token, isLoading } = useAuth();

  useEffect(() => {
    // If auth check is complete and user is not authenticated, redirect to login
    if (!isLoading && !token) {
      router.push("/login");
    }
  }, [token, isLoading, router]);

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  // If no token after loading, don't render dashboard (will redirect)
  if (!token) {
    return null;
  }

  // Only render dashboard if user is authenticated
  return <Dashboard />;
}
