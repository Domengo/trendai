"use client"

import { useState } from "react"
import { useMutation } from "react-query"
import api from "@/utils/api"
import Link from "next/link"

const ResetPassword = () => {
  const [email, setEmail] = useState("")

  const resetPasswordMutation = useMutation((email: string) => api.post("/auth/reset-password", { email }), {
    onSuccess: () => {
      alert("Password reset instructions have been sent to your email.")
    },
    onError: (error) => {
      console.error("Password reset failed:", error)
      alert("Failed to send password reset instructions. Please try again.")
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    resetPasswordMutation.mutate(email)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="px-8 py-6 mt-4 text-left bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200">Reset Password</h3>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 dark:bg-gray-700 dark:text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col justify-center gap-4 align-items-center">
              <button
                type="submit"
                className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                disabled={resetPasswordMutation.isLoading}
              >
                {resetPasswordMutation.isLoading ? "Sending..." : "Send Reset Instructions"}
              </button>
              <Link href="/login" className="text-sm text-blue-600 hover:underline">
                Back to Login
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword

