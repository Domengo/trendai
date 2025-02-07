"use client"

import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import { ThemeProvider } from "next-themes"
import { useState } from "react"
import { Toaster } from "react-hot-toast"
import type React from "react"

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class">
        {children}
        <Toaster position="top-right" />
      </ThemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

