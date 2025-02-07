"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {jwtDecode} from "jwt-decode"
import toast from "react-hot-toast"

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    if (storedToken) {
      try {
        const decodedToken: any = jwtDecode(storedToken)
        const currentTime = Date.now() / 1000
        if (decodedToken.exp < currentTime) {
          logout()
          toast.error("Your session has expired. Please log in again.")
        } else {
          setToken(storedToken)
        }
      } catch (error) {
        console.error("Error decoding token:", error)
        logout()
        toast.error("There was an issue with your session. Please log in again.")
      }
    }
  }, [])

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken)
    setToken(newToken)
    toast.success("Logged in successfully!")
  }

  const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
    router.push("/login")
    toast.success("Logged out successfully!")
  }

  return { token, login, logout }
}

