"use client";

import Link from "next/link";

export default function AuthForm({
  title,
  onSubmit,
  email,
  setEmail,
  password,
  setPassword,
  buttonText,
  linkText,
  linkHref,
}: {
  title: string;
  onSubmit: (e: React.FormEvent) => void;
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  buttonText: string;
  linkText: string;
  linkHref: string;
}) {
  return (
    <div className="px-8 py-6 mt-4 text-left bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200">{title}</h3>
      <form onSubmit={onSubmit}>
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
          <div className="mt-4">
            <label className="block text-gray-700 dark:text-gray-300" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 dark:bg-gray-700 dark:text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col justify-center gap-4 align-items-center">
            <button
              type="submit"
              className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
            >
              {buttonText}
            </button>
            <Link href={linkHref} className="text-sm text-blue-600 hover:underline">
              {linkText}
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}