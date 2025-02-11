"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import api from "@/lib/api";

export default function ProfilePage() {
  const { token, logout } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    )
      return;

    setIsDeleting(true);
    try {
      await api.delete("/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Account deleted successfully");
      logout();
    } catch (error) {
      if (error) {
        toast.error("Failed to delete account");
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-8 py-8">
      <h1 className="text-2xl font-bold mb-8">Profile Settings</h1>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Danger Zone</h2>

        <div className="border border-red-500 rounded-lg p-4">
          <h3 className="font-semibold text-red-500 mb-2">Delete Account</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            This will permanently delete your account and all associated data.
          </p>
          <button
            onClick={handleDeleteAccount}
            disabled={isDeleting}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
          >
            {isDeleting ? (
              <>
                <Loader className="w-4 h-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete Account"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
