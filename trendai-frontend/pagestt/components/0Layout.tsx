"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { Sun, Moon, Menu } from "lucide-react"
import { useTheme } from "next-themes"
import type React from "react" // Added import for React

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const router = useRouter()

  useEffect(() => setMounted(true), [])

  const navigation = [
    { name: "Dashboard", href: "/" },
    { name: "Campaigns", href: "/campaigns" },
    { name: "Influencers", href: "/influencers" },
    { name: "Submissions", href: "/submissions" },
  ]

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <aside className="z-20 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0">
        <div className="py-4 text-gray-500 dark:text-gray-400">
          <Link href="/" className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200">
            TrendAI
          </Link>
          <ul className="mt-6">
            {navigation.map((item) => (
              <li className="relative px-6 py-3" key={item.name}>
                <Link
                  href={item.href}
                  className={`inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 ${
                    router.pathname === item.href
                      ? "text-gray-800 dark:text-gray-100"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <div className="flex flex-col flex-1 w-full">
        <header className="z-10 py-4 bg-white shadow-md dark:bg-gray-800">
          <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
            <button
              className="p-1 mr-5 -ml-1 rounded-md md:hidden focus:outline-none focus:shadow-outline-purple"
              aria-label="Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex justify-center flex-1 lg:mr-32">
              <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
                <input
                  className="w-full pl-8 pr-2 text-sm text-gray-700 placeholder-gray-600 bg-gray-100 border-0 rounded-md dark:placeholder-gray-500 dark:focus:shadow-outline-gray dark:focus:placeholder-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:placeholder-gray-500 focus:bg-white focus:border-purple-300 focus:outline-none focus:shadow-outline-purple form-input"
                  type="text"
                  placeholder="Search for projects"
                  aria-label="Search"
                />
              </div>
            </div>
            <ul className="flex items-center flex-shrink-0 space-x-6">
              <li className="flex">
                <button
                  className="rounded-md focus:outline-none focus:shadow-outline-purple"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  aria-label="Toggle color mode"
                >
                  {mounted && (theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />)}
                </button>
              </li>
            </ul>
          </div>
        </header>
        <main className="h-full overflow-y-auto">
          <div className="container px-6 mx-auto grid">{children}</div>
        </main>
      </div>
    </div>
  )
}

export default Layout

