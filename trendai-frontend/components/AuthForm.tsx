"use client";

import { LucideIcon } from "lucide-react";
import React from "react";
import { JSX, useState } from "react";

export default function AuthForm({
  title,
  onSubmit,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  buttonText,
  buttonIcon,
  buttonDisabled,
  linkText,
  linkHref,
}: {
  title: string;
  onSubmit: (e: React.FormEvent) => void;
  name?: string;
  setName?: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  confirmPassword?: string;
  setConfirmPassword?: (password: string) => void;
  buttonText: string;
  buttonIcon?: LucideIcon | JSX.Element;
  buttonDisabled?: boolean;
  linkText: string;
  linkHref: string;
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="px-8 py-6 mt-4 text-left bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      <div>
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            {title}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {setName && (
              <div>
                <label htmlFor="name">Name</label>
                <input
                id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm dark:bg-gray-700"

                />
              </div>
            )}
            <div>
              <label htmlFor="email-address" className="">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm dark:bg-gray-700"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm dark:bg-gray-700"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {confirmPassword !== undefined && setConfirmPassword && (
              <div>
                <label htmlFor="confirm-password" className="">
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm dark:bg-gray-700"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="show-password"
                name="show-password"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
              />
              <label
                htmlFor="show-password"
                className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
              >
                Show password
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={buttonDisabled}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {buttonIcon && (
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  {typeof buttonIcon === "function" ? React.createElement(buttonIcon) : buttonIcon}
                </span>
              )}
              {buttonText}
            </button>
          </div>
        </form>

        <div className="text-center">
          <a
            href={linkHref}
            className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {linkText}
          </a>
        </div>
      </div>
    </div>
  );
}
