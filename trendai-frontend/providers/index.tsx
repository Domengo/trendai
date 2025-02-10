"use client";

import { QueryProvider } from "./QueryProvider";
import { AuthProvider } from "./AuthProvider";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <AuthProvider>
        <ThemeProvider attribute="class">
          {children}
          <Toaster position="top-right" />
        </ThemeProvider>
      </AuthProvider>
    </QueryProvider>
  );
}