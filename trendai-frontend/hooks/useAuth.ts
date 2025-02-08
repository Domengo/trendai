"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { jwtDecode } from "jwt-decode"
import toast from "react-hot-toast"

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const checkToken = useCallback(() => {
    try {
      const storedToken = localStorage.getItem("token")
      if (!storedToken) {
        setIsLoading(false)
        return
      }
      const decodedToken: any = jwtDecode(storedToken)
      const currentTime = Date.now() / 1000

      console.log("Decoded Token:", decodedToken);
      console.log("Current Time:", currentTime);

      if (decodedToken.exp < currentTime) {
        logout()
        toast.error("Your session has expired. Please log in again.")
        return false
      } else {
        setToken(storedToken)
        setIsLoading(false)
        return true
      }
    } catch (error) {
      console.error("Error checking token:", error)
      logout()
      toast.error("There was an issue with your session. Please log in again.")
      setIsLoading(false)
      return false
    }
  }, [])

  useEffect(() => {
    checkToken()
  }, [checkToken])

  const login = (newToken: string) => {
    try {
      localStorage.setItem("token", newToken)
      setToken(newToken)
      toast.success("Logged in successfully!")
      router.push("/campaigns")
    } catch (error) {
      console.error("Error logging in:", error)
      toast.error("Failed to log in. Please try again.")
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
    router.push("/login")
    toast.success("Logged out successfully!")
  }
  console.log("Token in useAuth hook:", token);
  
  return { token, login, logout, isLoading, checkToken }
}

